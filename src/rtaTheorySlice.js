import { createSlice } from '@reduxjs/toolkit'
import questions from './data.json'

const rtaTheorySlice = createSlice({
    name: 'rta-theory',
    initialState: {
        questions: questions,
        currentQuestion: 0,
        toQuestionNumber: 1,
        counters: {
            errors: 0,
            correct: 0,
        }
    },
    reducers: {
        nextQuestion: state => {
            state.currentQuestion += 1;
        },
        setAnswered: (state, {payload}) => {
            state.questions[state.currentQuestion].answerId = payload;
        },
        resetAllAnswered: state => {
            state.questions.map(question => question.answerId = null);
        },
        incrementAnswerError: state => {
            state.counters.errors += 1;
        },
        incrementAnswerCorrect: state => {
            state.counters.correct += 1;
        },
        shuffleQuestions: state => {
            state.questions = state.questions.sort(() => Math.random() - 0.5);
        },
        toQuestionNumberChange: (state, {payload}) => {
            state.toQuestionNumber = +payload;
        },
        toQuestion: state => {
            state.questions.map((question, index) => {
                if (question.numb === state.toQuestionNumber) {
                    state.currentQuestion = index;
                }
            });
        },
    }
});

export const { nextQuestion, incrementAnswerError, incrementAnswerCorrect, setAnswered, shuffleQuestions,
    toQuestionNumberChange, toQuestion, resetAllAnswered } = rtaTheorySlice.actions;

export default rtaTheorySlice.reducer;