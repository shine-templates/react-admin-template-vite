import Login from './components/Login'
import Styles from './index.module.scss'
import './index.scss'
import configs from 'configs'
import classnames from 'classnames'

export default () => {
  return (
    <div className={Styles.container}>
      <div className={classnames([Styles.wrapper])}>
        <div className={Styles.leftWrapper}></div>
        <div className={Styles.formWrapper}>
          <p className={Styles.systemTitle}>{configs.SYSTEM_TITLE}</p>
          <Login />
        </div>
      </div>
    </div>
  )
}
