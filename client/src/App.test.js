import { render, screen } from '@testing-library/react';
import App from './App';

import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import Cards from './Components/Cards/Cards';
import Nav from './Components/Nav/Nav';
import Buttons from './Components/Buttons';
import Create from './Components/Create/Create';


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


configure({adapter: new Adapter()});

describe('App', () => {
  let store
  const middlewares = []
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe('El componente Nav debe renderizar en todas las rutas menos en la de LandingPage.', () => {
    it('Debería renderizarse en la ruta "/poke"', () => {
      const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ '/poke' ]}>
              <App />
            </MemoryRouter>
          </Provider>
      );
        expect(wrapper.find(Nav)).toHaveLength(1);
    });
    it('Debería renderizarse en la ruta "/poke/1"', () => {
      const wrapper = mount(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ '/poke/1' ]}>
              <App />
            </MemoryRouter>
          </Provider>
      );
        expect(wrapper.find(Nav)).toHaveLength(1);
    });
  });

  it('El componente Cards debe renderizar en la ruta /poke (Sólo en la ruta "/poke")', () => {
    const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[ '/poke' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );

      expect(wrapper.find(Cards)).toHaveLength(1);
      expect(wrapper.find(Nav)).toHaveLength(1);
      expect(wrapper.find(Buttons)).toHaveLength(1);
  });

  it('El componente Create debe renderizar en la ruta /poke/create - este test no pasará si Otro componente (que no sea Nav) se renderiza en esta ruta.', () => {
    const container = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[  '/poke/create' ]}>
            <App />
          </MemoryRouter>
        </Provider>
    );
    expect(container.find(Nav)).toHaveLength(1);
    expect(container.find(Cards)).toHaveLength(0);
    expect(container.find(Create)).toHaveLength(1);
  });

});
