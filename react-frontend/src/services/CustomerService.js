import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/v1/customers";

class CustomerService{
    getExercise(){
        return axios.get("http://localhost:8080/api/v1/customers/journal/1/10/01/2020");
    }
}
export default new CustomerService()