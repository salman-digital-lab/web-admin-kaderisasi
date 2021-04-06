import React from "react";
export const AdminQuestionnaireContext = React.createContext();
export const AdminQuestionnaireProvider = (props) => {
  const ref = [];
  const [state, setState] = React.useState({
    title: "The Question",
    subtitle: "This question is about...",
    form: [{ variant: "short_text", question: "", required: false }],
  });
  const handleChangeTitleForm = (event) =>
    setState({ ...state, title: event.target.value });
  const handleChangeSubtitleForm = (event) =>
    setState({ ...state, subtitle: event.target.value });
  const handleChangeVariantForm = (id, event) => {
    const variant = event.target.value;
    let form = state.form;
    form[id] = {
      ...state.form[id],
      variant: variant,
    };
    if (variant === "radio_button" || variant === "checkbox") {
      form[id] = {
        ...state.form[id],
        answer: ["Yes of course"],
      };
    }
    setState({ ...state, form });
  };
  const handleChangeQuestionForm = (id, event) => {
    let form = state.form;
    form[id] = {
      ...state.form[id],
      question: event.target.value,
    };
    setState({ ...state, form });
  };
  const handleChangeAnswerForm = (id, index, event) => {
    let form = state.form;
    let answer = state.form[id].answer;
    const currentValue = event.target.value;
    answer[index] = currentValue;
    form[id] = { ...form[id], answer };
    setState({ ...state, form });
  };
  const handleAddAnswerForm = (id) => {
    let form = state.form;
    let answer = state.form[id].answer;
    answer.push("Yes of course");
    form[id] = { ...form[id], answer };
    setState({ ...state, form });
  };
  const handleDeleteAnswerForm = (id, index) => {
    let form = state.form;
    let answer = state.form[id].answer;
    answer = answer.filter((value, indexFilter) => index !== indexFilter);
    form[id] = { ...form[id], answer };
    setState({ ...state, form });
  };
  const handleSaveQuestionnaire = () => console.log(state);
  const handleAddNewForm = () =>
    setState({
      ...state,
      form: [
        ...state.form,
        {
          variant: "short_text",
          question: "",
          required: false,
        },
      ],
    });
  const handleDeleteForm = (id) => {
    let form = state.form;
    form = form.filter((value, index) => id !== index);
    setState({ ...state, form });
  };
  const handleRequiredForm = (id) => {
    let form = state.form;
    const required = state.form[id].required;
    form[id] = { ...form[id], required: !required };
    setState({ ...state, form });
  };
  const handleAddRef = (element) => {
    ref.push(element);
  };
  const functions = {
    handleChangeTitleForm,
    handleChangeSubtitleForm,
    handleChangeQuestionForm,
    handleChangeVariantForm,
    handleChangeAnswerForm,
    handleAddAnswerForm,
    handleDeleteAnswerForm,
    handleSaveQuestionnaire,
    handleAddNewForm,
    handleDeleteForm,
    handleRequiredForm,
    handleAddRef,
  };
  return (
    <AdminQuestionnaireContext.Provider
      value={{ data: state, setData: setState, ref, functions }}
    >
      {props.children}
    </AdminQuestionnaireContext.Provider>
  );
};
