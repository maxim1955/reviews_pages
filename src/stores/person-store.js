import {defineStore} from 'pinia';
import {computed, ref} from "vue";
import {faker} from '@faker-js/faker';

export const personReviews = defineStore('person', {
    state: () => ({
        person: ref([]),
    }),
    getters: {
        SET_PERSON(state) {
            return computed(() => state.person)
        },
    },
    actions: {
        GET_PERSON_FROM_FAKER() {
            for (let i = 0; i < 10; i++) {
                let person = {
                    name: faker.person.firstName(),
                    product: faker.lorem.sentence(5),
                    reviews: faker.lorem.paragraph({min: 1, max: 1}),
                    star: faker.number.int({min: 1, max: 5}),
                }
                this.person.push(person)
            }
        },
        LOAD_NEXT_PERSON() {
            for (let i = 0; i < 10; i++) {
                let person = {
                    name: faker.person.firstName(),
                    product: faker.lorem.sentence(5),
                    reviews: faker.lorem.paragraph({min: 1, max: 1}),
                    star: faker.number.int({min: 1, max: 5}),
                }
                this.person.push(person)
            }
        }
    },
});
