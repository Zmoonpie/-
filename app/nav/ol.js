import { Table, Input, Icon, Button, Popconfirm } from 'antd'
import React,{Component} from 'react'


class Xxx extends Component {


    constructor(props) {
        super(props);
        this.state = {
            modalshow: false,
            value: '',
            data: [
                {name: '红色阳光',},
                {name: '蓝色阳光',},
            ],
        }
    };

// 关闭弹窗
    onModal = (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            modalshow: !this.state.modalshow,
        });
    }
// input框输入
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
// 点击保存
    onSave = () => {
        let val = this.state.value
        this.setState({
            data: [{name: val}, ...this.state.data],
            modalshow: !this.state.modalshow,
        });
    }

// 点击列表中的删除
    onRemove(index, e) {
        this.setState({
            data: this.state.data.filter((elem, i) => index != i)
        });
    }

    render() {
        const {getFieldProps} = this.props.form;
        let lists = this.state.data.map((item, i) => (
            <Item key={i} extra={<div className="close" onClick={this.onRemove.bind(this, i)}></div>}>
                <img src={require('./images/prize.png')}/><span>{item.name}</span>
            </Item>
        ));
        return (
            <div className={style.tagwrape}>
                <List>
                    {lists}
                </List>
                <Button className="addbtn" onClick={this.onModal}>添加</Button>

                <div className={style.modalsef} style={{display: this.state.modalshow ? "block" : "none"}}>
                    <div className={style.fade}></div>
                    <div className={style.modacontainer}>
                        <div className={style.modalinner}>
                            <img src={require("./images/popimg.jpg")}/>
                            <div className={style.Modalcontent}>
                                <input value={this.state.value} onChange={this.onChange} placeholder="请输入分类"/>
                                <Button className={style.btn} onClick={this.onSave}>保存</Button>
                            </div>
                        </div>
                        <div className={style.close} onClick={this.onModal}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Xxx