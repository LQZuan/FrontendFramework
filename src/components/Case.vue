<template>
    <div>
        <template>
            <v-tabs :value="0" background-color="primary">
                <v-tab @click="$router.push({name: 'Case'})">用例管理</v-tab>
                <v-tab @click="$router.push({name: 'Task'})">任务管理</v-tab>
                <v-tab @click="$router.push({name: 'Jenkins'})">Jenkins管理</v-tab>
                <v-tab @click="$router.push({name: 'Report'})">报告管理</v-tab>
            </v-tabs>
        </template>

        <v-dialog
        v-model="taskDialog"
        max-width="500px"
        >
            <v-card>
                <v-card-title>
                    生成测试任务
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="任务名称" v-model="taskItem.name"></v-text-field>
                        <v-textarea label="备注" v-model="taskItem.remark"></v-textarea>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" class="btn" @click="addTask()">确定</v-btn>
                        <v-btn color="blue darken-1" class="btn" @click="taskDialog=false" text>取消</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>

        </v-dialog>

        <v-dialog
        v-model="editDialog"
        max-width="500px"
        >
            <v-card>
                <v-card-title>
                    修改测试用例
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="用例名称" v-model="editItem.caseName"></v-text-field>
                        <v-textarea label="用例数据" v-model="editItem.caseData"></v-textarea>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" class="btn" @click="updateCase()">确定</v-btn>
                        <v-btn color="blue darken-1" class="btn" @click="editDialog=false" text>取消</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>

        </v-dialog>

        <v-dialog
        v-model="addDialog"
        max-width="500px"
        >
            <v-card>
                <v-card-title>
                    添加测试用例
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="用例名称" v-model="addItem.name"></v-text-field>
                        <v-select :items="selectItem" label="用例类型" v-model="addItem.type"></v-select>
                        <v-textarea label="用例数据" v-model="addItem.data" v-if="addItem.type=='文本'"></v-textarea>
                        <v-file-input accept="image/*" v-model="addItem.file" label="用例数据" outlined dense v-if="addItem.type=='文件'"></v-file-input>
                        <v-text-field label="备注" v-model="addItem.remark"></v-text-field>
                    </v-container>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" class="btn" @click="addCase()">确定</v-btn>
                        <v-btn color="blue darken-1" class="btn" @click="addDialog=false" text>取消</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>

        </v-dialog>

        <v-btn color="primary" class="btn" @click="addDialog=true">添加用例</v-btn>
        <v-btn color="green" class="btn"  @click="taskDialog=true">生成任务</v-btn>
        <template>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="desserts"
                :single-select="singleSelect"
                show-select
            >
                <template v-slot:[`item.operate`] = "{item}">
                    <v-btn color="primary" small text @click="editCase(item)">编辑</v-btn>
                    <v-btn color="error" small text @click="delcase(item)">删除</v-btn>
                </template>
            </v-data-table>
        </template>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        addItem: {
            name: '',
            type: '',
            data: '',
            remark: '',
            file: ''
        },
        taskItem: {
            name: '',
            remark: ''
        },
        selectItem: ['文本', '文件'],
        editDialog: false,
        addDialog: false,
        singleSelect: false,
        taskDialog: false,
        selected: [],
        headers: [
          {
            text: 'id',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: '用例名称', value: 'caseName' },
          { text: '用例数据', value: 'caseData' },
          { text: '操作', value: 'operate' },
        ],
        desserts: [

        ],
        editItem: {}
      }
    },
    created(){
        let get_data = {
            pageNum: 1,
            pageSize: 10
        }
        this.$api.cases.getList(get_data).then(res=>{
            console.log(res)
            this.desserts = res.data.data.data
        })
    },
    methods: {
        addCase(){
            if(this.addItem.type == '文本') {
                let post_data = {
                    caseData: this.addItem.data,
                    caseName: this.addItem.name,
                    remark: this.addItem.remark
                }
                this.$api.cases.creatCaseByText(post_data).then(res=>{
                    console.log(res)
                })
            } else if(this.addItem.type == '文件') {
                let post_data = new FormData()
                post_data.append('caseFile', this.addItem.file)
                post_data.append('caseData', this.addItem.data)
                post_data.append('caseName', this.addItem.name)
                this.$api.cases.creatCaseByFile(post_data).then(res=>{
                    console.log(res)
                })
            }
            this.addDialog = false
            let get_data = {
                pageNum: 1,
                pageSize: 10
            }
            this.$api.cases.getList(get_data).then(res=>{
                console.log(res)
                this.desserts = res.data.data.data
            })
        },
        delcase(item){
            console.log(item)
            let del_data = {
                caseId : item.id
            }
            this.$api.cases.delCase(del_data).then(res=>{
                console.log(res)
            })
            let get_data = {
                pageNum: 1,
                pageSize: 10
            }
            this.$api.cases.getList(get_data).then(res=>{
                console.log(res)
                this.desserts = res.data.data.data
            })
        },
        editCase(item){
            this.editDialog = true
            this.editItem = item
        },
        updateCase(){
            let put_data = {
                caseData: this.editItem.caseData,
                caseName: this.editItem.caseName,
                remark: this.editItem.remark,
                id: this.editItem.id
            }
            this.$api.cases.updateCase(put_data).then(res=>{
                console.log(res)
            })
            this.editDialog = false
            let get_data = {
                pageNum: 1,
                pageSize: 10
            }
            this.$api.cases.getList(get_data).then(res=>{
                console.log(res)
                this.desserts = res.data.data.data
            })
        },
        addTask(){
            console.log(this.selected)
            let caseIdList = []
            for(let i=0; i < this.selected.length; i++){
                caseIdList.push(this.selected[i].id)
            }
            let post_data = {
                caseIdList: caseIdList,
                testTask: {
                    name: this.taskItem.name,
                    remark: this.taskItem.remark
                }
            }
            this.$api.cases.createTask(post_data).then(res=>{
                console.log(res)
            })
            this.taskDialog = false
        }
    }
  }
</script>

<style scoped>
    .btn {
        margin: 10px;
    }
</style>