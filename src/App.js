import './app.css';
import {useDispatch, useSelector} from "react-redux";
import {
    incrementAnswerCorrect,
    incrementAnswerError,
    nextQuestion,
    setAnswered, shuffleQuestions, toQuestion, toQuestionNumberChange
} from "./rtaTheorySlice";
import clsx from "clsx";

function App() {
    const dispatcher = useDispatch()

    const questions = useSelector(state => state.rtaTheory.questions);
    const currentQuestion = useSelector(state => state.rtaTheory.currentQuestion);
    const question = useSelector(state => state.rtaTheory.questions[currentQuestion]);
    const toQuestionNumber = useSelector(state => state.rtaTheory.toQuestionNumber);

    const countErrors = useSelector(state => state.rtaTheory.counters.errors);
    const countCorrect = useSelector(state => state.rtaTheory.counters.correct);

    const answerClickHandler = index => {
        if (Number.isInteger(question.answerId)) {
            return;
        }
        dispatcher(setAnswered(index));
        if (question.answerval === index) {
            dispatcher(incrementAnswerCorrect());
        } else {
            dispatcher(incrementAnswerError());
        }
    };

    const nextBtnClickHandler = () => dispatcher(nextQuestion());

    const selectedClassName = index => {
        if (!Number.isInteger(question.answerId)) {
            return '';
        }
        // Ответ верный
        if (question.answerval === question.answerId && question.answerId === index) {
            return 'options__item--correct';
        }
        // Ответ не верный
        if (question.answerval !== question.answerId && question.answerId === index) {
            return 'options__item--incorrect';
        }
        // Ответ не верный, выделяю верный
        if (question.answerval !== question.answerId && question.answerval === index) {
            return 'options__item--correct';
        }
    };

    const shuffleBtnClickHandler = () => dispatcher(shuffleQuestions());

    const toQuestionBtnClickHandler = () => dispatcher(toQuestion());

    const toQuestionInputChangeHandler = event => dispatcher(toQuestionNumberChange(event.target.value));

    return (
        <div className="content-container">
            <div className="controls">
                <div className="controls__item">
                    <button className="btn btn-primary" onClick={shuffleBtnClickHandler}>
                        перемешать вопросы
                    </button>
                </div>
                {/*<div className="controls__item">
                    <button className="btn btn-primary">
                        начать экзамен
                    </button>
                </div>*/}
                <div className="controls__item">
                    <input type="number" min="1" value={toQuestionNumber} onChange={toQuestionInputChangeHandler} max={questions.length} />
                    <button className="btn btn-primary" onClick={toQuestionBtnClickHandler}>
                        перейти к вопросу
                    </button>
                </div>
            </div>
            <div className="item">
                <div className="question" dangerouslySetInnerHTML={{__html: `${question.numb}. ${question.text_ru}`}}></div>
                <div className="options">
                    {question.options.map((option, index) => <div
                        key={index}
                        className={clsx('options__item', selectedClassName(index))}
                        onClick={() => answerClickHandler(index)}
                        dangerouslySetInnerHTML={{__html: option.text_ru}}
                    ></div>)}
                </div>
            </div>
            <div className="content-container__footer">
                <div className="content-container__footer-start">
                    {currentQuestion+1} из {questions.length} вопросов<br/>
                    ошибок: {countErrors} | правильных ответов: {countCorrect}
                </div>
                <div className="content-container__footer-end">
                    {Number.isInteger(question.answerId) && currentQuestion < questions.length - 1 && <button className="btn btn-link" onClick={nextBtnClickHandler}>Следующий вопрос</button>}
                </div>
            </div>
        </div>
    );
}

export default App;
