import { useFormik } from 'formik';
import Header from './../../components/Header';
import { schema } from './schema';
import { useContext, useEffect } from 'react';
import UserContext from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { user, signUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/coins');
    }
  }, [user]);

// useFormik: hook that allows us to use formik features
  const formik = useFormik({
   //determining the values to be kept in the form
    initialValues: {
      email: '',
      age: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  // introduce form validations
     // validationSchema: schema,

     // runs on the form's submission event.
    onSubmit: async (values, actions) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
   // registers the user
      signUser(values);

      // clears the form
      actions.resetForm();

     // redirect to home page
      navigate('/coins');
    },
  });

  return (
    <div>
      <Header />

      <div className="container">
        <div className="logo">
          <img src="https://www.iconpacks.net/icons/1/free-coin-icon-794-thumb.png" />
          <h3>CoinMania</h3>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.email &&
              formik.touched.email &&
              'input-error'
            }
          />
          {/* If there is an error and the input is focused, give the error message */}
          {formik.errors.email && formik.touched.email && (
            <p className="error">{formik.errors.email}</p>
          )}

          <label>Age</label>
          <input
            type="number"
            id="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.age && formik.touched.age && 'input-error'
            }
          />
          {/* If there is an error and focus is lost from the input,  give teh error message */}
          {formik.errors.age && formik.touched.age && (
            <p className="error">{formik.errors.age}</p>
          )}

          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onPaste={() => false}
            onBlur={formik.handleBlur}
            className={
              formik.errors.password &&
              formik.touched.password &&
              'input-error'
            }
          />
          {/* If there is an error and focus is lost from the input,  give the error message*/}
          {formik.errors.password && formik.touched.password && (
            <p className="error">{formik.errors.password}</p>
          )}

          <label>Password Confirmation</label>
          <input
            type="password"
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.confirmPassword &&
              formik.touched.confirmPassword &&
              'input-error'
            }
          />
          {/* If there is an error and focus is lost from the input, give the error message */}
          {formik.errors.confirmPassword &&
            formik.touched.confirmPassword && (
              <p className="error">{formik.errors.confirmPassword}</p>
            )}

          <div className="check">
            <div className="d-flex gap-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                onChange={formik.handleChange}
                value={formik.values.terms}
              />
              <label htmlFor="terms">I read and approve</label>
            </div>

            {/* If there is an error and focus is lost from the input, give the error message */}
            {formik.errors.terms && formik.touched.terms && (
              <p className="error">{formik.errors.terms}</p>
            )}
          </div>
          <button disabled={formik.isSubmitting} type="submit">
          Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;