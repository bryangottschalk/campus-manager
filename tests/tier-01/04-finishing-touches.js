const { expect } = require('chai');
import enzyme, { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';

import * as rrd from 'react-router-dom';
const { MemoryRouter, Link } = rrd;

import mockAxios from '../mock-axios';

import store from '../../app/store';

const { Campus, Student } = require('../../server/db');
const seed = require('../../seed');

const adapter = new Adapter();
enzyme.configure({ adapter });

import { AllCampuses } from '../../app/components/AllCampuses';
import { AllStudents } from '../../app/components/AllStudents';

import Root from '../../app/components/root';

// Sometimes, we want to wait for a short tinme for async events to finish.
const waitFor = wait => new Promise(resolve => setTimeout(resolve, wait));

describe('Tier One: Final Touches', () => {
  describe('Navigation', () => {
    /** In order to test react-router, we need to hijack the BrowserRouter
     *  in the root of our app. Sinon allows us to "stub" the BrowserRouter.
     *  Whenever a component calls BrowserRouter, it'll instead render a
     *  component that merely renders the children. After the tests are done,
     *  we'll clean up after ourselves by restoring BrowserRouter.
     */
    const campuses = [
      { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
      { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
    ];
    const students = [
      { id: 1, firstName: 'Mae', lastName: 'Jemison' },
      { id: 2, firstName: 'Sally', lastName: 'Ride' },
    ];
    beforeEach(() => {
      sinon.stub(rrd, 'BrowserRouter').callsFake(({ children }) => {
        return <div>{children}</div>;
      });
      mockAxios.onGet('/api/campuses').replyOnce(200, campuses);
      mockAxios.onGet('/api/students').replyOnce(200, students);
    });
    afterEach(() => {
      rrd.BrowserRouter.restore();
    });

    it('renders <AllCampuses /> at /campuses', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/campuses']}>
            <Root />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(AllCampuses)).to.have.length(1);
      expect(wrapper.find(AllStudents)).to.have.length(0);
    });

    it('renders <AllStudents /> at /students', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/students']}>
            <Root />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(AllCampuses)).to.have.length(0);
      expect(wrapper.find(AllStudents)).to.have.length(1);
    });

    it('*** navbar to navigate to home, campuses, students', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Root />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find('Home'));
      expect(wrapper.find('Campuses'));
      expect(wrapper.find('Students'));
      // expect(wrapper.text()).to.include('Campuses');
      // expect(wrapper.text()).to.include('Students');
      // throw new Error('replace this error with your own test');
    });
  });

  describe('Seed file', () => {
    beforeEach(seed);

    it('populates the database with at least three campuses', async () => {
      const campuses = await Campus.findAll();
      expect(campuses).to.have.lengthOf.at.least(3);
    });

    it('populates the database with at least four students', async () => {
      const students = await Student.findAll();
      expect(students).to.have.lengthOf.at.least(4);
    });

    it('*** creates exactly one campus that has no students', async () => {
      const campuses = await Campus.findAll();
      let res;
      for (let i = 0; i < campuses.length; i++) {
        let campusStudentsArr = await campuses[i].getStudents();
        if (campusStudentsArr.length === 0) {
          res = [campuses[i]];
        }
      }
      expect(res).to.have.lengthOf(1);
    });

    it('*** creates exactly one student that is not enrolled in a campus', async () => {
      const students = await Student.findAll();
      const unenrolledStudent = students.filter(student => {
        return student.campusId === null;
      });
      console.log('TCL: unenrolledStudent', unenrolledStudent);
      expect(unenrolledStudent).to.have.lengthOf(1);
    });
  });

  describe('React-Redux', () => {
    const campuses = [
      { id: 1, name: 'Mars Academy', imageUrl: '/images/mars.png' },
      { id: 2, name: 'Jupiter Jumpstart', imageUrl: '/images/jupiter.jpeg' },
    ];
    const students = [
      { id: 1, firstName: 'Mae', lastName: 'Jemison' },
      { id: 2, firstName: 'Sally', lastName: 'Ride' },
    ];
    beforeEach(() => {
      sinon.stub(rrd, 'BrowserRouter').callsFake(({ children }) => {
        return <div>{children}</div>;
      });
      mockAxios.onGet('/api/campuses').replyOnce(200, campuses);
      mockAxios.onGet('/api/students').replyOnce(200, students);
    });
    afterEach(() => {
      rrd.BrowserRouter.restore();
    });

    it('initializes campuses and students from the server when the app first loads', async () => {
      const reduxStateBeforeMount = store.getState();
      expect(reduxStateBeforeMount.campuses).to.deep.equal([]);
      expect(reduxStateBeforeMount.students).to.deep.equal([]);
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Root />
          </MemoryRouter>
        </Provider>
      );
      await waitFor(10); // wait for 10 milliseconds
      const reduxStateAfterMount = store.getState();
      expect(reduxStateAfterMount.campuses).to.deep.equal(campuses);
      expect(reduxStateAfterMount.students).to.deep.equal(students);
    });

    xit('<AllCampuses /> is passed campuses from store as props', async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/campuses']}>
            <Root />
          </MemoryRouter>
        </Provider>
      );
      await waitFor(10); // wait for 10 milliseconds
      wrapper.update();
      const { campuses: reduxCampuses } = store.getState();
      const { campuses: componentCampuses } = wrapper.find(AllCampuses).props();
      expect(componentCampuses).to.deep.equal(reduxCampuses);
    });

    xit('<AllStudents /> is passed students from store as props', async () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/students']}>
            <Root />
          </MemoryRouter>
        </Provider>
      );
      await waitFor(10); // wait for 10 milliseconds
      wrapper.update();
      const { students: reduxStudents } = store.getState();
      const { students: componentStudents } = wrapper.find(AllStudents).props();
      expect(componentStudents).to.deep.equal(reduxStudents);
    });
  });
});
