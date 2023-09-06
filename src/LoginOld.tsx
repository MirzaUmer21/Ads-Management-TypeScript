import { FunctionComponent } from 'react';
import styles from './css/Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

const Submit = () => {};
export const Login: FunctionComponent = () => {
  return (
    <div>
      <form onSubmit={Submit} action='/crm-login'>
        <div className={styles.loginContainer}>
          <div className={styles.loginFormContainer}>
            <div className={styles.facebookContainer}>
              <div className={styles.textContainer2}>
                <div className={styles.byProceedingYou}>
                  <span>By proceeding you also agree to the </span>
                  <span className={styles.termsOfService}>
                    Terms of Service
                  </span>
                  <span> and </span>
                  <span className={styles.termsOfService}>Privacy Policy</span>
                </div>
              </div>

              <div>
                <input
                  className={styles.facebookCTAContainer}
                  type='submit'
                  value=''
                />

                <div className={styles.textContainer1}>
                  <div className={styles.signInWith}>Sign in with Facebook</div>
                  <div className={styles.fbLogoContainer}>
                    <div className={styles.base5} />
                    <img
                      className={styles.fbLogoIcon}
                      alt=''
                      src='/fb-logo@2x.png'
                    />
                  </div>
                </div>

                {/* </div> */}
              </div>

              <div className={styles.orContainer}>
                <div className={styles.byProceedingYou}>or</div>
              </div>
            </div>
            {/* changes in below container */}
            <div className={styles.emailFormContainer}>
              <div className={styles.cTAContainer}>
                <div>
                  <button className={styles.base4} type='submit'>
                    Sign in{' '}
                  </button>
                </div>
              </div>

              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>EMAIL ADDRESS</Form.Label>
                <Form.Control type='email' placeholder='Enter email address' />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>PASSWORD</Form.Label>

                <Form.Control type='password' placeholder='Password' />
              </Form.Group>
              <Form.Check
                type='checkbox'
                id={'default-checkbox'}
                label='Remember me'
              ></Form.Check>
              {/* <div className="forgotPasswordContainer">Forgot Password</div> */}
              <div className={styles.forgotPasswordContainer}>
                <div className={styles.forgotPasswordText}>
                  <a href=''>Forgot Password ?</a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
              <div className={styles.welcomeBackText}>Welcome Back</div>
            </div>
            <div className={styles.subtitleContainer}>
              <div className={styles.weCantWait}>
                We can't wait to show you your efficiencies
              </div>
            </div>
          </div>
          <img className={styles.logo} alt='' src='/logo.svg' />
          <img className={styles.illustration} alt='' src='/illustration.svg' />
        </div>
      </form>
    </div>
  );
};
