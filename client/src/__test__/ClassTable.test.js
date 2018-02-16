import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import ClassTable from './../ClassTable';
import mockResponse from './mock/response';

describe("ClassTable", () => {
  window.fetch = jest.fn().mockImplementation(function() {
    return Promise.resolve(mockResponse(200, null, JSON.stringify([])));
  })
  let props;
  let mountedClassTable;
  const classTable = () => {
    if (!mountedClassTable) {
      mountedClassTable = mount(
        <ClassTable {...props} />
      );
    }
    return mountedClassTable;
  }

  it("always renders a div", () => {
    const divs = classTable().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("fetches GET /students", () => {
    const fetchSpy = jest.spyOn(window, 'fetch');
    expect(fetchSpy).toHaveBeenCalledWith('/students');
  });

  it("displays a special message if the student list is empty", () => {
    expect(classTable().find(".errors").text()).toEqual("classroom is empty");
  });
});