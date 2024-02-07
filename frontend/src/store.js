import { reactive } from 'vue';

export const store = reactive({
    param: '',
    setParam(newParam) {
        this.param = newParam;
    }
});