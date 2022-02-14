import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { createQuestion } from "../actions/questions";
import { addNewQuestionToUser } from "../actions/users";

const renderField = (field) => {
  const { touched, error } = field.meta;
  return (
    <div className={`form-group ${touched && error ? "has-danger" : ""}`}>
      <input
        type={"text"}
        className="form-control"
        {...field.input}
        placeholder={field.placeholder}
      />
      <div className="text-help">{touched ? error : ""}</div>
    </div>
  );
};

const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const NewQuestion = (props) => {
  const { authedUser, users, form } = props;
  const author = users[authedUser];

  let question = {};
  let id;

  let userQuestions;
  if (form.NewQuestionForm.values) {
    id = generateId();
    const { optionOne, optionTwo } = form.NewQuestionForm.values;
    question = {
      id,
      author: authedUser,
      timestamp: Date.now(),
      optionOne: {
        votes: [],
        text: optionOne,
      },
      optionTwo: {
        votes: [],
        text: optionTwo,
      },
    };
    userQuestions = {
      ...author,
      questions: author.questions.concat(question.id),
    };
  }

  const onSubmitClick = () => {
    props
      .dispatch(createQuestion(question))
      .then(
        props.dispatch(addNewQuestionToUser(authedUser, userQuestions, id))
      );
  };

  if (!authedUser) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="ui center aligned header">
      <div className="ui card fluid">
        <div className="image change-image ">
          <img alt="" src={author.avatarURL} />
        </div>
        <div className="content">
          <div>{author.name}</div>
          <h3>Would you rather ...</h3>
          <form onSubmit={props.handleSubmit(onSubmitClick)}>
            <Field
              label="Option One"
              name="optionOne"
              placeholder="Option one..."
              component={renderField}
            />
            <div className="bg-light" style={{ marginBottom: "20px" }}>
              OR
            </div>
            <Field
              name="optionTwo"
              placeholder="Option two..."
              component={renderField}
            />
            <div className="d-flex justify-content-evenly">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <Link className="btn btn-danger" to={"/"}>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const validate = (values) => {
  const error = {};
  if (!values.optionOne) {
    error.optionOne = "Enter Option One";
  }

  if (!values.optionTwo) {
    error.optionTwo = "Enter option two";
  }

  return error;
};

const mapStateToProps = (state) => {
  return {
    authedUser: state.authedUser,
    users: state.users,
    form: state.form,
    questions: state.questions,
  };
};
export default reduxForm({ form: "NewQuestionForm", validate })(
  connect(mapStateToProps)(NewQuestion)
);
