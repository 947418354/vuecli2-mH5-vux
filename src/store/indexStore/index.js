import createStore from '@/store'


import indexBanner from './modules/indexBanner'
import hotProducts from './modules/hotProducts'
import productCategory from './modules/productCategory'
import categoryProducts from './modules/categoryProducts'
import message from './modules/message'
import microShop from './modules/microShop'
import indexFeature from './modules/indexFeatureList'
import indexSubscribe from './modules/indexSubscribe'
import signAgreement from './modules/signAgreement'
import insuranceKnowledge from './modules/insuranceKnowledge'
import register from './modules/register'
import protocol from './modules/protocol'
import contract from './modules/contract'
import address from './modules/address'
import cmslist from './modules/cmslist'
import exam from './modules/exam'
import companyChoose from './modules/companyChoose'
import customer from './modules/customer'
import customerDetail from './modules/customerDetail'
import groupTabs from './modules/groupTabs'
import groupDetail from './modules/groupDetail'
import addLabel from './modules/addLabel'
import jim from './modules/jim'

export default createStore({
  address,
  categoryProducts,
  cmslist,
  contract,
  companyChoose,
  customer,
  customerDetail,
  exam,
  groupTabs,
  groupDetail,
  hotProducts,
  indexBanner,
  indexFeature,
  indexSubscribe,
  insuranceKnowledge,
  message,
  microShop,
  productCategory,
  protocol,
  register,
  signAgreement,
  addLabel,
  jim,
})
