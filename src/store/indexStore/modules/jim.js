/* eslint-disable */
import apiService from '@/common/jim/api.services'
import jimServices from '@/common/jim/api.services'
import { getObjInobjArrByPropVal } from "@/utils/arr";
import { timestampToConversation } from '@/utils/date'
import Vue from 'vue'
import apiECard from "@/api/eCard";

// initial state
const initState = {
  loginUserInfo: {},  // 登陆后返回的用户信息
  userInfo: {},       // 用户信息
  conversations: [],   // 获取的会话列表
  messageLists: [],  // 离线同步的会话列表
  // conversationsUnreadNum: 0, // 总的未读数
  currentConversation: '',  // 当前所处的会话
  // currentMessageList: '',   // 当前所处的会话离线信息
}

// getters
const getters = {
  // addList(state) {
  //   return map(state.addLabelList, item => ({
  //     value: item.value,
  //     delete: 'Y',
  //   }))
  // },
  getConversationList(state) {
    return state.conversation
  },
  conversationsUnreadNum(state) {
    return state.conversations.reduce((acc, item) => {
      return acc + item.unread_msg_count
    }, 0)
  }
}

// mutations
const mutations = {
  LOGIN_USER_INFO(state, userInfo) {
    state.loginUserInfo = userInfo
  },
  USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 更新用户信息的avatarUrl
  mutUserInfoAvatarUrl(state, { payload }) {
    payload.userInfo.avatarUrl = payload.avatarUrl
  },
  mutMessageLists(state, conversations) {
    state.messageLists = conversations
  },
  getConversationSuccess(state, { payload }) {
    console.log('getConversationSuccess得到的参数', payload)
    if (payload.storage) {
      state.conversations = payload.conversation;
      if (payload.messageList.length > 0) {
        state.messageList = payload.messageList;
      }
      filterRecentMsg(state);
      // filterAtList(state);
      state.isLoaded = true;
      completionMessageList(state);
    }
    if (payload.shield) {
      initGroupShield(state, payload.shield);
    }
    if (payload.noDisturb) {
      state.noDisturb = payload.noDisturb;
      initNoDisturb(state, payload.noDisturb);
    }
    /*if (state.friendList.length > 0) {
      filterConversationMemoName(state);
    }*/
    conversationsUnreadNum(state);
  },
  MSG_RECEIPT_CHANGE_EVENT(state, { payload }) {
    console.log('mutation MSG_RECEIPT_CHANGE_EVENT传进来的参数', payload)
    payload.forEach((ele, i) => {
      const messageListOffline = getObjInobjArrByPropVal(
        "from_username",
        ele.username,
        state.messageLists
      );
      if (messageListOffline) {
        const msgs = messageListOffline.msgs;
        ele.receipt_msgs.forEach((receiptMsg, j) => {
          for (let k = 0; k < msgs.length; k++) {
            if (msgs[k].msg_id === receiptMsg.msg_id) {
              console.log("找到了已读回执报告");
              Vue.prototype.$set(msgs[k], 'unread_count', receiptMsg.unread_count)
              // msgs[k].unread_count = receiptMsg.unread_count;
              break;
            }
          }
        });
      }
    });
  },
  // 首次进入的会话 把标志位置为false
  onceConversationToFalse(state, username) {
    const conversation = getObjInobjArrByPropVal('username', username, state.messageLists)
    conversation.isOnceEnterConversation = false
  },
  mutConversationAvatarUrl(state, { payload }) {
    // console.log('登录后初始化通过mutConversationAvatarUrl把每个会话头像赋值到对应的conversation payload', payload)
    payload.conversation.avatarUrl = payload.avatarUrl
  },
  // 更新会话的user_info
  mutConversationUserInfo(state, { payload }) {
    // console.log('登录后初始化通过mutConversationUserInfo把每个用户信息赋值到对应的conversation')
    payload.conversation.user_info = payload.user_info
  },
  // 将信息push到对应的messageList中并且将对应的conversation置顶更新最近一条消息
  mutMessageListPush(state, { payload }) {
    console.log('执行mutMessageListPush payload', payload)
    const conversation = state.conversations.find((ele) => ele.name === payload.messageList.from_username)
    payload.messageList.msgs.push(payload.msg)
    conversation.recentMsg = payload.msg
    let index = state.conversations.indexOf(conversation)
    if (index !== 0) {
      state.conversations.unshift(state.conversations.splice(index, 1)[0])
    }
  },
  MSG_RECEIPT_CHANGE(state, data) {
    data.receipt_msgs
    const msgList = state.messageLists[data.username].msgList
    data.receipt_msgs.forEach((ele, i) => {
      for (let j = msgList.length - 1; j >= 0; j--) {
        if (msgList[j].msg_id === ele.msg_id) {
          msgList[j].isRead = true
          break;
        }
      }
    })
  },
  // 首次进入会话页时 将历史消息批量回执
  mutMsgMutipleReceiptReport(state) {
    const msg_ids = []
    const opt = {
      msg_ids,
      username: state.currentMessageList.from_username
    }
    state.currentMessageList.msgs.forEach((ele) => {
      if (ele.content.from_id !== state.userInfo.username) {
        msg_ids.push(ele.msg_id)
      }
    })
    // 避免这个接口报无意义的错误
    if (msg_ids.length > 0) apiService.addSingleReceiptReport(opt).then(() => {
      apiECard.receipts(msg_ids)
    })
  },
  receiveMessageSuccess(state, { payload }) {
    const message = payload.messages[0]
    let conversation = state.conversations.find((item) => item.username === message.from_username)

    // 接收信息成功后 判断是不是当前会话的
    if (state.currentConversation && state.currentConversation.name === message.from_username) {
      const msg_ids = [message.msg_id]
      const opt = {
        msg_ids,
        username: message.from_username
      }
      apiService.addSingleReceiptReport(opt).then(() => {
        apiECard.receipts(msg_ids)
      })
    } else {
      conversation && conversation.unread_msg_count++
    }
    addMessage.call(this, state, payload, conversation)
  },
  // 更新当前所处会话与messageList, messageList就是同步的离线数据
  mutCurrentConversationMessageList(state, { payload }) {
    if (typeof payload === 'string') {
      state.currentConversation = state.conversations.find((ele) => ele.username === payload)
      state.currentMessageList = state.messageLists.find((ele) => ele.from_username === payload)
    } else {
      state.currentConversation = payload
      state.currentMessageList = getObjInobjArrByPropVal('from_username', payload.username, state.messageLists)
    }
    // 把即将要进入的会话页的会话未读数置0
    apiService.resetUnreadCount(state.currentConversation)
    state.currentConversation.unread_msg_count = 0
    refreshConversationList(state)
  },
  // 退出会话页时 重置当前会话与离线数据
  mutResetCurrentConversation(state) {
    state.currentConversation = null
    state.currentMessageList = null
  },
  // 把图片资源赋值到对应的信息主体上
  mutMsgBodyMediaUrl(state, { payload }) {
    payload.msg_body.media_url = payload.url
  },
  mutUnshiftConversation(state, { payload }) {
    state.conversations.unshift(payload.conversation)
    state.messageLists.unshift(payload.messageList)
  },
}

// actions
const actions = {
  // 是否是已有会话
  actIsHaveConversation({ state, commit }, { payload }) {
    let conversation = state.conversations.find((item) => item.username === payload)
    if (!conversation) {
      console.log('直接进入会话页不是已有会话 本地新建一个会话')
      conversation = {
        username: payload,
        unread_msg_count: 0,
        user_info: {}
      }
      // 获取对方信息
      actGetUserInfo({ username: payload }, conversation, commit)
      let messageList = {
        msgs: [],
        from_username: payload,
        msg_type: 3,
      }
      commit({
        type: 'mutUnshiftConversation',
        payload: {
          conversation,
          messageList,
        }
      })
      commit({
        type: 'mutCurrentConversationMessageList',
        payload: conversation,
      })
    } else {
    }
    commit({
      type: 'mutCurrentConversationMessageList',
      payload: conversation,
    })
  },
  actGetConversation: async ({ commit }, { data }) => {
    const info = await apiService.getConversation();
    console.log('获取到的会话数据', info)
    if (info.code) {
      this.errorFn(info);
    } else {
      // 删除feedBack_
      for (let i = 0; i < info.conversations.length; i++) {
        info.conversations[i].unreadNum = info.conversations[i].unread_msg_count;
        if (info.conversations[i].name.match(/^feedback_/g)) {
          info.conversations.splice(i, 1);
        }
      }
      info.conversations.reverse();
      // 对置顶会话进行排序
      let topArr = [];
      let notopArr = [];
      for (let conversation of info.conversations) {
        if (conversation.extras && conversation.extras.top_time_ms) {
          topArr.push(conversation);
        } else {
          notopArr.push(conversation);
        }
      }
      for (let i = 0; i < topArr.length; i++) {
        for (let j = i + 1; j < topArr.length; j++) {
          if (topArr[i].extras.top_time_ms > topArr[j].extras.top_time_ms) {
            let temp = topArr[i];
            topArr[i] = topArr[j];
            topArr[j] = temp;
          }
        }
      }
      info.conversations = topArr.concat(notopArr);
      const conversations = info.conversations
      // 获取头像url
      let promises = [];
      for (let conversation of conversations) {
        conversation.user_info = {}
        conversation.avatarUrl = ''
        // 群聊 conversation.type 3 单聊 4 群聊
        if (conversation.type === 4 && conversation.name === '') {
          const groupObj = { gid: conversation.key };
          const pro = this.apiService.getGroupMembers(groupObj).then((group) => {
            if (group.code) {
              conversation.name = '#群名获取失败？？';
              this.errorFn(group);
            } else {
              let name = '';
              for (let member of group.member_list) {
                name += (member.nickName || member.nickname ||
                  member.username || member.name) + '、';
              }
              if (name.length > 20) {
                conversation.name = name.substr(0, 20);
              } else {
                conversation.name = name.substr(0, name.length - 1);
              }
              conversation.target_name = conversation.name;
              conversation.group_name = conversation.name;
            }
          });
          promises.push(pro);
        } else {
          if (conversation.avatar) {
            const urlObj = { media_id: conversation.avatar }
            apiService.getResource(urlObj, (succDataGetResource) => {
              const avatarUrl = succDataGetResource.url
              commit({
                type: 'mutConversationAvatarUrl',
                payload: {
                  conversation,
                  avatarUrl,
                }
              })
            }, () => { console.log('初始化获取某个会话头像资源失败') })
          }
          /*jimServices.getUserInfo({
            username: conversation.name
          }, (data) => {
            const user_info = data.user_info
            console.log('登录后初始化获取会话用户每个之一信息成功user_info' + conversation.name, user_info)
            if (user_info.avatar) {
              const urlObj = { media_id: user_info.avatar }
              apiService.getResource(urlObj, (succDataGetResource) => {
                user_info.avatarUrl = succDataGetResource.url
                commit({
                  type: 'mutConversationUserInfo',
                  payload: {
                    conversation,
                    user_info,
                  }
                })
              }, () => {console.log('初始化获取某个会话头像资源失败')})
            }
          })*/
        }
      }
      // 获取免打扰列表
      /*let noDisturb;
      const pro1 = this.apiService.getNoDisturb().then((noDisturbList) => {
        if (noDisturbList.code) {
          this.errorFn(noDisturbList);
        } else {
          noDisturb = noDisturbList.no_disturb;
        }
      });
      let shield;
      // 获取屏蔽列表
      const pro2 = this.apiService.groupShieldList().then((groupList: any) => {
        if (groupList.code) {
          this.errorFn(groupList);
        } else {
          shield = groupList.groups;
        }
      });
      promises.push(pro1);
      promises.push(pro2);
      await Promise.all(promises);*/
      commit({
        type: 'getConversationSuccess',
        payload: {
          conversation: info.conversations,
          storage: true,
          messageList: data,
          // noDisturb,
          // shield
        }
      })
      /*this.store$.dispatch({
        type: chatAction.getFriendList,
        payload: 'first'
      });
      this.store$.dispatch({
        type: contactAction.getGroupList,
        payload: 'first'
      });*/
    }
  },
  actOfflineImgResource({ state, commit }, { payload }) {
    const messageList = getObjInobjArrByPropVal('from_username', payload, state.messageLists)
    for (let j = 0; j < state.messageLists.length; j++) {
      if (messageList === state.messageLists[j]) {
        for (let i = 0; i < state.messageLists[j].msgs.length; i++) {
          if (state.messageLists[j].msgs[i].content.msg_type === 'image') {
            if (!state.messageLists[j].msgs[i].content.msg_body.media_url) {
              const urlObj = { media_id: state.messageLists[j].msgs[i].content.msg_body.media_id };
              const pro1 = apiService.getResource(urlObj).then((result) => {
                if (result.code) {
                  state.messageLists[j].msgs[i].content.msg_body.media_url = '';
                } else {
                  // state.conversations[j].msgs[i].content.msg_body.media_url = result.url;
                  commit({
                    type: 'mutMsgBodyMediaUrl',
                    payload: {
                      msg_body: state.messageLists[j].msgs[i].content.msg_body,
                      url: result.url
                    }
                  })
                }
              });
            } else {
              break
            }
          }
        }
        break
      }
    }
  },
  sendSinglePic: async ({ state, commit }, { data }) => {
    const msgs = await apiService.sendSinglePic(data);
    console.log('storeaction sendSinglePic', msgs)
    // 提前给图片消息创建media_url属性,用于响应式绑定. 信息未读数置为1
    msgs.content.msg_body.media_url = ''
    msgs.unread_count = 1
    const urlObj = { media_id: msgs.content.msg_body.media_id };
    apiService.getResource(urlObj).then((result) => {
      if (result.code) {
        state.messageLists[j].msgs[i].content.msg_body.media_url = '';
      } else {
        // state.conversations[j].msgs[i].content.msg_body.media_url = result.url;
        commit({
          type: 'mutMsgBodyMediaUrl',
          payload: {
            msg_body: msgs.content.msg_body,
            url: result.url
          }
        })
      }
    });
    commit({
      type: 'mutMessageListPush',
      payload: {
        messageList: state.currentMessageList,
        msg: msgs
      }
    })
  },
  receiveSingleMessage: async ({ state, commit }, { payload }) => {
    const message = payload.data.messages[0]
    let content = payload.data.messages[0].content;
    let conversation = state.conversations.find((item) => item.username === message.from_username)
    // 判断新收到的消息会话是否存在现有的会话列表中?
    if (!conversation) {
      if (message.msg_type === 3) {
        const messageList = {
          key: message.key,
          msgs: [
            message
          ],
          draft: '',
          content: message.content,
          type: 3,
          name: message.content.name,
          from_username: message.from_username,
          appkey: message.content.appkey
        };
        conversation = {
          username: message.from_username,
          avatar: message.content.avatarUrl,
          avatarUrl: message.content.avatarUrl,
          key: message.key,
          mtime: message.ctime_ms,
          name: message.content.name,
          nickName: message.content.from_name,
          type: 3,
          unreadNum: message.content.from_id !== global.user ? 1 : 0,
          unread_msg_count: 0,
          noDisturb: false,
          extras: {}
        };
        // 将构建好的messageList和conversation 接入到主流中
        commit({
          type: 'mutUnshiftConversation',
          payload: {
            conversation,
            messageList
          }
        })
        jimServices.getUserInfo({
          username: conversation.username
        }, (data) => {
          const user_info = data.user_info
          if (user_info.avatar) {
            const urlObj = { media_id: user_info.avatar }
            jimServices.getResource(urlObj, (succDataGetResource) => {
              user_info.avatarUrl = succDataGetResource.url
              commit({
                type: 'mutConversationUserInfo',
                payload: {
                  conversation,
                  user_info,
                }
              })
              commit({
                type: 'mutConversationAvatarUrl',
                payload: {
                  conversation,
                  avatarUrl: succDataGetResource.url,
                }
              })
            })
          }
        })
      }
    }
    let promises = [];
    // 如果是文件或者图片
    getMediaUrl(payload, promises);
    // 如果是名片
    // this.getCardResource(content, payload, promises);
    await Promise.all(promises);
    commit({
      type: 'receiveMessageSuccess',
      payload: payload.data
    });
  }
}

// 获取用户信息
function actGetUserInfo(obj, conversation, commit) {
  console.log('执行function actGetUserInfo')
  jimServices.getUserInfo(obj, (data) => {
    const user_info = data.user_info
    if (user_info.avatar) {
      const urlObj = { media_id: user_info.avatar }
      jimServices.getResource(urlObj, (succDataGetResource) => {
        user_info.avatarUrl = succDataGetResource.url
        commit({
          type: 'mutConversationUserInfo',
          payload: {
            conversation,
            user_info,
          }
        })
      }, () => {
        console.log('获取头像资源失败!')
      }, () => {
        console.log('获取头像资源超时!')
      })
    }
  })
}
// 添加最近一条聊天消息
function filterRecentMsg(state) {
  console.log('添加最近一条聊天消息所用到的内外循环数据', state.conversations, state.messageList)
  for (let conversation of state.conversations) {
    for (let messageList of state.messageLists) {
      console.log('添加最近一条聊天消息内循环')
      const group = conversation.type === 4 && messageList.msg_type === 4 &&
        Number(conversation.key) === Number(messageList.key);
      const single = conversation.type === 3 && messageList.msg_type === 3 &&
        conversation.name === messageList.from_username;
      if (group || single) {
        console.log('匹配到是单聊或者群聊')
        let msgs = messageList.msgs;
        if (msgs.length > 0) {
          msgs[msgs.length - 1].conversation_time_show =
            timestampToConversation(msgs[msgs.length - 1].ctime_ms);
          conversation.recentMsg = msgs[msgs.length - 1];
        }
        break;
      }
    }
  }
  sortConversationByRecentMsg(state);
}

// 通过recentMsg去对conversation排序
function sortConversationByRecentMsg(state) {
  for (let conversation of state.conversations) {
    if (conversation.recentMsg) {
      conversation.lastMsgTime = conversation.recentMsg.ctime_ms;
    } else {
      conversation.lastMsgTime = 0;
    }
  }
  let len = state.conversations.length;
  let maxIndex;
  let temp;
  let topIndex = 0;
  for (let i = 0; i < len; i++) {
    if (!state.conversations[i].extras || !state.conversations[i].extras.top_time_ms) {
      topIndex = i;
      break;
    }
  }
  // 内外双循环 冒泡排序
  for (let i = topIndex; i < len - 1; i++) {
    maxIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (state.conversations[j].lastMsgTime >
        state.conversations[maxIndex].lastMsgTime) {
        maxIndex = j;
      }
    }
    temp = state.conversations[i];
    state.conversations[i] = state.conversations[maxIndex];
    state.conversations[maxIndex] = temp;
  }
}

// 登录时处理会话at提示
function filterAtList(state) {
  if (state.messageList.length > 0) {
    for (let conversation of state.conversations) {
      let num = conversation.unreadNum;
      if (num > 0) {
        for (let messageList of state.messageList) {
          let group = messageList.type === 4 && conversation.type === 4 &&
            Number(messageList.key) === Number(conversation.key);
          if (messageList.msgs && messageList.msgs.length > 0 && group) {
            let length = messageList.msgs.length;
            for (let i = length - 1; i >= length - 1 - num && i >= 0; i--) {
              let atUser = messageHasAtList(messageList.msgs[i].content.at_list);
              if (atUser !== '') {
                conversation.atUser = atUser;
                break;
              }
            }
            break;
          }
        }
      }
    }
  }
}

// 离线消息15天后消失，而会话列表依然存在，导致不一一对应，所以补全离线消息
function completionMessageList(state) {
  for (let conversation of state.conversations) {
    let flag = false;
    for (let messageList of state.messageLists) {
      const group = messageList.type === 4 &&
        Number(conversation.key) === Number(messageList.key);
      const single = messageList.type === 3 &&
        conversation.name === messageList.name;
      if (group || single) {
        flag = true;
        break;
      }
    }
    // if (!flag) {
    //   if (conversation.type === 3) {
    //     state.messageList.push({
    //       key: conversation.key,
    //       msgs: [],
    //       type: 3,
    //       appkey: conversation.appkey,
    //       name: conversation.name
    //     });
    //   } else if (conversation.type === 4) {
    //     state.messageList.push({
    //       key: conversation.key,
    //       msgs: [],
    //       type: 4
    //     });
    //   }
    // }
  }
}

function addMessage(state, payload, conversation) {
  let message = payload.messages[0];
  const isMySelf = message.content.from_id === state.userInfo.username;
  // 分单聊与群聊对msg数据进行完善
  if (message.msg_type === 3) {
    message.content.name = isMySelf ? message.content.target_id : message.content.from_id;
    message.content.nickName =
      isMySelf ? message.content.target_name : message.content.from_id;
  } else {
    message.content.name = message.content.from_id;
    message.content.nickName = message.content.from_name;
    message.content.appkey = message.content.from_appkey;
  }
  if (payload.messages && payload.messages[0]) {
    // 将收到的消息或者发送的消息 放到最新一条的消息
    conversation.recentMsg = message
    for (let messageList of state.messageLists) {
      const groupMsg = message.msg_type === 4 && messageList.type === 4 &&
        Number(messageList.key) === Number(message.key);
      const singleMsg = message.msg_type === 3 && messageList.msg_type === 3 &&
        messageList.from_username === message.content.name;
      if (groupMsg || singleMsg) {
        console.log('找到了信息匹配的messagelist,准备push')
        this.commit({
          type: 'jim/mutMessageListPush',
          payload: {
            messageList: messageList,
            msg: message,
          }
        })
        break;
      }
    }
    // 采用数组concat指向新数组的方式 更新视图
    state.conversations = state.conversations.concat()
  }
}

// 更新会话的未读总数
function conversationsUnreadNum(state) {
  console.log('模块中被调用函数接收到的state', state)
  let count = 0;
  for (let conversation of state.conversations) {
    if (!conversation.noDisturb && conversation.unreadNum) {
      count += conversation.unreadNum;
    }
  }
  // state.conversationsUnreadNum = count;
}

// 接收消息获取media url
function getMediaUrl(obj, promises) {
  if (obj.data.messages[0].content.msg_body.media_id) {
    const urlObj = { media_id: obj.data.messages[0].content.msg_body.media_id };
    const pro1 = apiService.getResource(urlObj).then((result) => {
      if (result.code) {
        obj.data.messages[0].content.msg_body.media_url = '';
      } else {
        obj.data.messages[0].content.msg_body.media_url = result.url;
      }
    });
    if (promises && promises instanceof Array) {
      promises.push(pro1);
    }
  }
}

// 通过对象数组重指新数组更新conversationList
function refreshConversationList(state) {
  state.conversations = state.conversations.concat()
}

export default {
  state: initState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
