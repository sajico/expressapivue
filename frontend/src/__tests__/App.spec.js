import { describe, expect, it } from 'vitest';

import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('App', () => {
    it('renders properly', () => {
        const wrapper = mount(App, { props: { id: 987 } });
        expect(wrapper.text()).toContain('987');
    });
});
