import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Comment, Form } from 'semantic-ui-react';
import { deleteComment, editComment } from '../../store/comment/comment';
import './CommentBlock.css';

const CommentBlock = (props) => {
  const { user } = useSelector((state) => state.authentication);
  const [edit, setEdit] = useState(false);
  const [editContent, setEditContent] = useState(props.content);
  const dispatch = useDispatch();

  const onEditHandler = () => {
    dispatch(editComment(props.id, editContent));
    setEdit(false);
  };

  const onDeleteHandler = () => {
    dispatch(deleteComment(props.id));
  };

  const formatingTime = (time) => {
    let temp = time.split('T');
    let result = temp[0].replace(/-/g, '.') + ' at ';
    let hour = Number(temp[1].substring(0, 2));
    let meridiem = ' AM';
    if (hour >= 12) {
      meridiem = ' PM';
      hour -= 12;
    }
    if (hour == 0) hour = 12;
    result += String(hour) + ':' + temp[1].substring(3, 5) + meridiem;
    return result;
  };

  const buttons =
    user && user.nickname === props.author ? (
      <Comment.Actions>
        <Comment.Action
          data-testid="editButton"
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </Comment.Action>
        <Comment.Action data-testid="deleteButton" onClick={() => onDeleteHandler()}>
          Delete
        </Comment.Action>
      </Comment.Actions>
    ) : (
      <Comment.Actions />
    );
  const content = edit ? (
    <Comment className="Comment">
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{props.author}</Comment.Author>
        <Comment.Metadata>
          <div>{formatingTime(props.time)}</div>
        </Comment.Metadata>
        <Form.TextArea
          onChange={(event) => setEditContent(event.target.value)}
          placeholder="Write your comment here"
          value={editContent}
        />
        <Button
          data-testid="submitEditButton"
          className="mainBasicButton"
          content="Edit"
          labelPosition="right"
          icon="edit"
          onClick={() => onEditHandler()}
        />
      </Comment.Content>
    </Comment>
  ) : (
    <Comment className="Comment">
      <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
      <Comment.Content>
        <Comment.Author as="a">{props.author}</Comment.Author>
        <Comment.Metadata>
          <div>{formatingTime(props.time)}</div>
        </Comment.Metadata>
        <Comment.Text>{props.content}</Comment.Text>
        {buttons}
      </Comment.Content>
    </Comment>
  );

  return (
    <div className="CommentBlock" data-testid="CommentBlock">
      <Form>{content}</Form>
    </div>
  );
};

export default CommentBlock;
