import React, { Component,Fragment } from 'react';
import { Tree,Input,InputNumber,Icon,Button } from 'antd';
import moment from 'moment';
import AddCategory from './AddCategory';
import SpecificationOrDataModal from './SpecificationOrDataModal';
import treeJSON from './Tree.json';
import styles from '../../goodsStyles.less'

const { TreeNode } = Tree;


class GoodsMainCategory extends Component {

  state={
    categoryVisible:false,
    addTitle:'',
    SpecificationOrDataTitle:'',
    SpecificationOrDataVisible:false,
    SpecificationOrDataType:''
  }

  componentDidMount(){
    console.log(treeJSON)
  }

  AddCategoryModel=(types,title)=>{
    let type = false;
    if(types === 'open'){
      type=true
    }
    this.setState({
      categoryVisible:type,
      addTitle:title
    })
  }

  SpecificationOrDataModel=(types,title)=>{
    let type = false;
    if(types === 'open'){
      type=true
    }

    let gaunlianStr =''
    if(title === '关联规格'){
      gaunlianStr='specification'
    }
    this.setState({
      SpecificationOrDataVisible:type,
      SpecificationOrDataTitle:title,
      SpecificationOrDataType:gaunlianStr
    })
  }

  setTreeNodeTitle=(item)=>{
    return <div className={`clearfix ${styles.GoodsMainWrap}`}>
            <div className={styles.treeName}>
              <Input defaultValue={item.category_name} size='small' style={{width:120}} />
              {item.category_level !== 3 ? <a onClick={()=>{this.AddCategoryModel('open','新增子目录')}}> 新增子目录</a> : null}
            </div>
            <div className={styles.treeSort}>
              <InputNumber size='small' style={{width:60}} min={0} defaultValue={item.sort} />
            </div>
            <div className={styles.treeTime}>
              {
                moment(item.created*1000).format("YYYY-MM-DD")
              }
            </div>
            <div className={styles.treeEdit}>
              {
                item.category_level === 3 ?
                <div className={styles.btnItem}>
                  <a onClick={()=>{this.SpecificationOrDataModel('open','关联参数')}}>关联参数</a>
                  <a onClick={()=>{this.SpecificationOrDataModel('open','关联规格')}}>关联规格</a>
                  <a>查看商品</a>
                  <Icon type="delete" style={{cursor:'pointer',lineHeight:'28px',marginLeft:10}} />
                </div>
                  :
                <div className={styles.btnItem}>
                  <a>查看商品</a>
                  <Icon type="delete" style={{cursor:'pointer',lineHeight:'28px',marginLeft:10}} />
                </div>
              }
            </div>
        </div>  
  }

  

  render() {
    const {categoryVisible,addTitle,SpecificationOrDataType,SpecificationOrDataTitle,SpecificationOrDataVisible} = this.state;
    const loop = data =>
      data.map(item => {
        if (item.children && item.children.length) {
          return (
            <TreeNode 
              key={item.category_id} 
              title={
                this.setTreeNodeTitle(item)
              }
            >
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode 
          key={item.category_id} 
          title={
            this.setTreeNodeTitle(item)
          } 
        />;
      });
    return (
      <Fragment>
        <Button
          type="primary"
          icon="plus"
          style={{marginBottom:10}}
          onClick={()=>{this.AddCategoryModel('open','添加顶级目录')}}
        >
            添加顶级目录
        </Button>
        <Tree
          className={`draggable-tree ${styles.treeWrap}`}
          autoExpandParent
        >
          {loop(treeJSON)}
        </Tree>
        <AddCategory
          visible={categoryVisible}
          title={addTitle}
          onClose={() => {
            this.AddCategoryModel('close');
          }}
        />
        <SpecificationOrDataModal 
          type={SpecificationOrDataType}
          visible={SpecificationOrDataVisible}
          title={SpecificationOrDataTitle}
          onClose={() => {
            this.AddCategoryModel('close');
            this.SpecificationOrDataModel('close');
          }}
        />
      </Fragment>

      
      
      
    );
  }
}
export default GoodsMainCategory;
