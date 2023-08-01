const initialState = {
    questionNumber: 0,
    answers: {},
  };
  
  const quizReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_ANSWER':
        const { questionId, answerIndex } = action.payload;
        return {
          ...state,
          answers: {
            ...state.answers,
            [questionId]: answerIndex,
          },
        };
      default:
        return state;
    }
  };
  
  export default quizReducer;