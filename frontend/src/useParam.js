import { ref } from 'vue';

const store = ref({
    param: '',
});

export const useParam = () => {
    const actions = {
        setParam: (newParam) => {
            store.param = newParam;
        },
    };
    return {
        store,
        actions,
    }
}