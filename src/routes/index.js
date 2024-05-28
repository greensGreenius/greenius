/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import routers from './routes';

import * as Layout from '../layout';
import * as Pages from '../pages';

export const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routers.map(({ component, path, exact = false, childrens = [] }) => {
          if (childrens.length > 0) {
            const LayoutComponent = Layout[component];
            return (
              <Route
                path={path}
                exact={exact}
                key={path}
                element={<LayoutComponent />}
              >
                {childrens.map(
                  ({ component: ChildrenComponent, path: childrenPath }) => {
                    const PageComponent = Pages[ChildrenComponent];
                    console.log('PageComponent---------', path + childrenPath);
                    return (
                      <Route
                        path={path + childrenPath}
                        key={path + childrenPath}
                        element={<PageComponent />}
                      />
                    );
                  }
                )}
              </Route>
            );
          }
          const PageComponent = Pages[component];
          return (
            <Route
              path={path}
              exact={exact}
              key={path}
              element={<PageComponent />}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
};
