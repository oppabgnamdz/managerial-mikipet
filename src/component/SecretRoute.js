import { authentication } from '../auth';
import { Route, Redirect } from 'react-router-dom';
export function SecuredRoute(props) {
  return (
    <Route
      path={props.path}
      render={(data) =>
        authentication.getLogInStatus() ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: '/' }}></Redirect>
        )
      }
    ></Route>
  );
}
