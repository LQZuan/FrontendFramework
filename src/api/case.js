import axios from './http'

const cases = {
    getList(params){
        return axios.get('/testCase/list', params)
    },
    creatCaseByText(params){
        return axios.post('/testCase/text', params)
    },
    creatCaseByFile(params){
        return axios.post('/testCase/file', {
            methods: 'post',
            data: params,
            header: {'Content-type': 'multiple/form-data'}
        })
    },
    delCase(params){
        return axios.delete('/testCase/' + params.caseId, params)
    },
    updateCase(params){
        return axios.put('/testCase', params)
    },
    createTask(params){
        return axios.post('/task', params)
    }
}
export default cases