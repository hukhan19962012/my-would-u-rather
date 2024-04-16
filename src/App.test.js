import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { NavBar } from './components/NavBar';
import { logoutAuthUser } from './func/authUser';
import { App } from './components/App';
import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './utils/_DATA';



const mockStore = configureStore([]);



describe('Header', () => {
  let store

  beforeEach(() => {
    store = mockStore({
      authUser: {
        user: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: 'https://ui-avatars.com/api/?name=Sarah+Edo',
        },
      },
    });
  });

  test('renders dashboard link correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );

    const homeLink = screen.getByText(/Home/i);
    expect(homeLink).toBeInTheDocument();
  });

  test('renders Logout link correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );

    const homeLink = screen.getByText(/Logout/i);
    expect(homeLink).toBeInTheDocument();
  });

  test('renders LeaderBoard link correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );

    const homeLink = screen.getByText(/LeaderBoard/i);
    expect(homeLink).toBeInTheDocument();
  });


  test('dispatches logout action on clicking the Logout button', () => {
    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>
    );

    const logoutButton = screen.getByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);
    setTimeout(3000)
    const loginLink = screen.queryByText(/Logout/i);
    expect(loginLink).not.toBeInTheDocument();
  });
});



describe("Question and User Management Tests", () => {
  describe("_getUsers", () => {
    it("should retrieve the users data", async () => {
      const users = await _getUsers();
      expect(users).toBeDefined();
    });
  });

  describe("_getQuestions", () => {
    it("should retrieve the questions data", async () => {
      const questions = await _getQuestions();
      expect(questions).toBeDefined();
    });
  });

  describe("_saveQuestion", () => {
    it("should save a new question", async () => {
      const question = {
        optionOneText: "Option One",
        optionTwoText: "Option Two",
        author: {
          id: "sarahedo",
          password: "1234",
          name: "Sarah Edo",
          avatarURL: "/assets/images/snow.jpg",
          answers: {},
          questions: [],
        },
      };

      const savedQuestion = await _saveQuestion(question);
      expect(savedQuestion).toBeDefined();
      expect(savedQuestion.id).toBeDefined();
      expect(savedQuestion.author.id).toBe(question.author.id);
    });

    it("should reject when required fields are missing", async () => {
      const emptyUser = {
        id: "",
        name: "",
        password: "",
        avatarURL: "",
        answers: {},
        questions: [],
      };

      await expect(
        _saveQuestion({
          optionOneText: "",
          optionTwoText: "",
          author: emptyUser,
        })
      ).rejects.toEqual(
        "Please provide optionOneText, optionTwoText, and author"
      );
      await expect(
        _saveQuestion({
          optionOneText: "Option One",
          optionTwoText: "Option Two",
          author: '',
        })
      ).rejects.toEqual(
        "Please provide optionOneText, optionTwoText, and author"
      );
    });
  });

  describe("_saveQuestionAnswer", () => {
    it("should save a user's answer to a question", async () => {
      const user = {
        authedUser: "sarahedo",
        qid: "8xf0y6ziyjabvozdd253nd",
        answer: "optionOne"
      }

      const result = await _saveQuestionAnswer(user);
      expect(result).toBeTruthy();
    });

    it("should reject when required fields are missing", async () => {
      await expect(
        _saveQuestionAnswer({ authedUser: "", qid: "", answer: "" })
      ).rejects.toBeTruthy();
      await expect(
        _saveQuestionAnswer({ authedUser: "sarahedo", qid: "", answer: "" })
      ).rejects.toBeTruthy();
    });
  });
});
