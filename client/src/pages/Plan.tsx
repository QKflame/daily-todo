import React, { useEffect, useState } from 'react';
import { Input, message } from 'antd';
import {Collapse, Empty, Checkbox, Modal, Progress, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import cx from 'classnames';
import styles from '../styles/pages/plan.module.scss';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { observer } from 'mobx-react-lite';
import { useMst } from '../models/Root';
import PlanMenu from '../components/PlanMenu';
import { asyncThrottle } from '../utils/util';
import { createPlan } from '../requests/plan';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import { Slider } from 'antd';

const { RangePicker } = DatePicker;

const { Panel } = Collapse;

interface IconSliderProps {
    max: number;
    min: number;
  }

const IconSlider: React.FC<IconSliderProps> = props => {
  const { max, min } = props;
  const [value, setValue] = useState(0);

  const mid = Number(((max - min) / 2).toFixed(5));
  const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
  const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';

  return (
    <div className={cx(styles['icon-wrapper'])}>
      <FrownOutlined className={cx(styles[preColorCls])} />
      <Slider {...props} onChange={setValue} value={value} />
      <SmileOutlined className={cx(styles[nextColorCls])} />
    </div>
  );
};

const MenuHeader = observer(() => {
  const {plan: store} = useMst();

  const onClickAddIcon = () => {
    store.setCreateModalVisible(true);
  };
  return (
    <div className={cx(styles['menu-header-container'])}>
      <div className={cx(styles['menu-header'])}>清单</div>
      <PlusOutlined className={cx(styles['menu-add-icon'])} onClick={onClickAddIcon} />
    </div>
  );
});

const Menu = observer(() => {
  const { plan: store } = useMst();
  const [title, setTitle] = useState<string>('');

  const onCreateModalOk = asyncThrottle(() => {
    return new Promise(resolve => {
      createPlan({
        title
      }).then(res => {
        message.success('创建成功');
        store.setCreateModalVisible(false);
        resolve(res);
      });
    });
  });

  const onCreateModalCancel = () => {
    store.setCreateModalVisible(false);
  };

  const onInputTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className={cx(styles['menu-container'])}>
      <MenuHeader></MenuHeader>
      <PlanMenu items={store.menusItems}></PlanMenu>
      <Modal
        title="新增清单"
        okText="确认"
        cancelText="取消"
        open={store.createModalVisible}
        onOk={onCreateModalOk}
        onCancel={onCreateModalCancel}
      >
        <div className={cx('common-form-container')}>
          <div className={cx('common-form-item-container')}>
            <div className={cx('common-form-label')}>清单名称</div>
            <Input placeholder='请输入清单名称' value={title} onInput={onInputTitle}></Input>
          </div>
        </div>
      </Modal>
    </div>
  );
});

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function TodoItem() {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(e);
  };
  const value = '是京东卡老实交代了开始就的克拉斯';
  return (
    <div className={cx(styles['todo-item-container'])}>
      <Checkbox
        className={cx(styles['todo-checkbox'])}
        onChange={onChange}
      ></Checkbox>

      <div className={cx(styles['todo-item-content'])}>
        <div className={cx(styles['todo-item-text'])}>
          <Input
            defaultValue="无标题"
            value={value}
            bordered={false}
            className={cx(styles['todo-item-input'])}
          />
          <div className={cx(styles['todo-thumbnail'])}>
          圣诞节快乐是点击蓝思科技的克拉斯就大厦考虑到吉安市肯德基拉手孔
          </div>
        </div>

        <Progress type="circle" percent={75} width={35} format={percent => percent}/>
      </div>
    </div>
  );
}

function TodoList() {
  return (
    <div className={cx(styles['todo-list-container'])}>
      <h3>的数据库担惊受恐大家梳理</h3>

      <Input
        className="todo-input"
        placeholder="+ 点击回车添加任务"
        allowClear
      />

      <Collapse defaultActiveKey={['1']} ghost className="todo-collapse">
        <Panel header="高优先级" key="1">
          <TodoItem />
        </Panel>
        <Panel header="中优先级" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="低优先级" key="3">
          <p>{text}</p>
        </Panel>
        <Panel header="无优先级" key="4">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </div>
  );
}

function OperationBar() {
  const onChange = (e: CheckboxChangeEvent) => {
    console.log(e);
  };
  return (
    <div className={cx(styles['operation-bar-container'])}>
      <div className={cx(styles['left-container'])}>
        {/* <Checkbox
          className={cx(styles['todo-checkbox'])}
          onChange={onChange}
        ></Checkbox> */}
        <RangePicker bordered={false} />
      </div>
      <div className={cx(styles['right-container'])}>
        <Slider defaultValue={30} disabled={false} />
      </div>
    </div>
  );
}

function TodoEditor() {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('<p>hello</p>');
  useEffect(() => {
    setTimeout(() => {
      setHtml('<p>hello world</p>');
    }, 1500);
  }, []);

  const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
      'group-image',
      'group-video',
      'headerSelect',
      'fullScreen',
      '|',
      'fontSize',
      'fontFamily',
      'lineHeight',
      'divider',
    ],
  };

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  };
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div className={cx(styles['todo-editor-container'])}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #f2f2f2' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: 'calc(100vh - 300px)', overflowY: 'hidden' }}
        />
      </div>
    </>
  );
}

function TodoContent() {
  const value = '是点击开始的可接受的健康山东健康山东';
  return (
    <div className={cx(styles['todo-content-container'])}>
      <Input
        placeholder="无标题"
        value={value}
        bordered={false}
        className={cx(styles['todo-detail-title-input'])}
      />
      <Input
        placeholder="请输入卡片地址"
        bordered={false}
        className={cx(styles['todo-detail-cardLink-input'])}
      />
      <TodoEditor />
    </div>
  );
}

function TodoDetail() {
  const isEmpty = false;
  return (
    <div className={cx(styles['todo-detail-container'])}>
      {isEmpty ? (
        <Empty
          className={cx(styles['empty-detail'])}
          description="点击任务标题查看详情"
        />
      ) : (
        <div>
          <OperationBar />
          <TodoContent />
        </div>
      )}
    </div>
  );
}

export default function Plan() {
  return (
    <div className={cx('plans-page-container', styles['plans-page-container'])}>
      <Menu />
      <div className={cx(styles['plans-content-container'])}>
        <TodoList />
        <TodoDetail />
      </div>
    </div>
  );
}
