import { NetworkUtils } from "./NetworkUtils";

const login = (props) => {
  return NetworkUtils.post(`v1/user/login`, {
      email : props.email,
      password : props.password
  });
};


const ServiceApi = {
  login,
};

export default ServiceApi