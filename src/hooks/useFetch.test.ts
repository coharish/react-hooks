import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import useFetch from './useFetch';

beforeEach(() => {
  jest
    .spyOn(global, 'fetch')
    .mockImplementationOnce(() => Promise.resolve({} as any));
});

afterEach(() => {
  jest.restoreAllMocks();
});

it('returns null when exception', async () => {
  const { result } = renderHook(useFetch<any>);

  expect(result.current.data).toBeUndefined();
});
