import api from '@/api/account'
import * as types from '../mutation-types'

const transferData = (list) => {
  const data = list.map((item) => {
    const question = { id: item.id, type: item.type, title: item.examinationQuestion }
    const optionList = []
    const number = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    number.forEach((value) => {
      const option = item[`option${value.toLocaleLowerCase()}`]
      if (option) {
        optionList.push({
          value,
          title: option,
        })
      }
    })
    question.optionList = optionList
    return question
  })
  return data
}

const initialState = {
  questionList: [],
  examinationId: '',
  examScore: '', // 考试得分
  passScore: '', // 及格分数
  errorMsg: '',
}

const getters = {
}

const actions = {
  getQuestions({ commit }, params) {
    return api.queryExamnations(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.GET_QUESTIONS_SUCCESS, res.data.resultContent)
      } else {
        commit(types.GET_QUESTIONS_FAIL, res.data.resultMsg)
      }
    })
  },
  saveExamResults({ commit }, params) {
    return api.saveExamResults(params).then((res) => {
      if (res.data.resultFlag) {
        commit(types.SAVE_QUESTIONS_SUCCESS, res.data.resultContent)
      } else {
        commit(types.SAVE_QUESTIONS_FAIL, res.data.resultMsg)
      }
    })
  },
}

const mutations = {
  [types.GET_QUESTIONS_SUCCESS](state, data) {
    state.questionList = transferData(data[0].records)
    state.examinationId = data[0].id
  },
  [types.GET_QUESTIONS_FAIL](state, data) {
    state.errorMsg = data
  },
  [types.SAVE_QUESTIONS_SUCCESS](state, data) {
    state.examScore = data.examScore
    state.passScore = data.passes
  },
  [types.SAVE_QUESTIONS_FAIL](state, data) {
    state.errorMsg = data
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
  namespaced: true,
}
