import { useCallback } from "react";

//import "survey-core/modern.min.css";
import 'survey-core/survey.min.css';
import { StylesManager, Model } from "survey-core";
import { Survey } from "survey-react-ui";

StylesManager.applyTheme("default");

const surveyJson = {
  title: "React",
  showProgressBar: "bottom",
  showTimerPanel: "top",
  maxTimeToFinishPage: 60,
  maxTimeToFinish: 300,
  firstPageIsStarted: true,
  startSurveyText: "Start Quiz",
  pages: [{
      elements: [{
          type: "html",
          html: "This is a quiz on React. <br>You will have 60 seconds for every question and 5 minutes to end the quiz."
      }]
  }, {
      elements: [{
          type: "radiogroup",
          name: "port",
          title: "What is the default local host port that a React development server uses?",
          choices: [
              "4200", "3000", "5000", "8080"
          ],
          correctAnswer: "3000"
      }]
  }, {
      elements: [{
          type: "radiogroup",
          name: "virtual",
          title: "A copy of the 'real' DOM that is kept in memory is called what?",
          choicesOrder: "random",
          choices: [
              "Virtual DOM", "VDOM", "Shadow DOM", "React DOM"
          ],
          correctAnswer: "Virtual DOM"
      }]
  }, {
      elements: [{
        "type": "boolean",
        "name": "keys",
        "title": "useId can be used to generate keys in a list.",
        "correctAnswer": false
      }]
  },
  {
    elements: [{
        type: "radiogroup",
        name: "operator",
        title: "Which operator can be used to conditionally render a React component?",
        choicesOrder: "random",
        choices: [
            "?",
            ":",
            "||",
            "&&"
        ],
        correctAnswer: "&&"
    }]
  },
  {
    elements: [{
        type: "radiogroup",
        name: "useId",
        title: "useId generates a string that includes the which token?",
        choicesOrder: "random",
        choices: [
            "!",
            "&",
            ":",
            "?"
        ],
        correctAnswer: ":"
    }]
  } 


],
  completedHtml: "<h4>You got <b>{correctAnswers}</b> out of <b>{questionCount}</b> correct answers.</h4>",
  completedHtmlOnCondition: [{
      expression: "{correctAnswers} == 0",
      html: "<h4>Unfortunately, none of your answers are correct. Please try again.</h4>"
  }, {
      expression: "{correctAnswers} == {questionCount}",
      html: "<h4>Congratulations! You answered all the questions correctly!</h4>"
  }]
};

function App() {
  const survey = new Model(surveyJson);
  survey.focusFirstQuestionAutomatic = false;

  const alertResults = useCallback((sender) => {
    // send to database
    const results = JSON.stringify(sender.data);
    console.log(results);
  }, []);

  survey.onComplete.add(alertResults);

  return <Survey model={survey} />;
}

export default App;
