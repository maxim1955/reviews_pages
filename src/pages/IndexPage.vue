<template>
    <q-page class=" q-pa-lg text-white">
        <div class="q-pa-md reviews_main">
            <q-list class="flex" style=";">
                <q-item class="star q-mr-md " style="max-width: 350px">
                    <q-item-section>
                        <q-item-label>Рейтинг: <span class="text-white q-pl-sm text-h5">5</span></q-item-label>
                    </q-item-section>
                    <q-item-section side top v-for="n of 5" class="q-pl-sm ">
                        <q-icon name="star" color="yellow"/>
                    </q-item-section>
                </q-item>
                <q-item class="star q-mr-md">
                    <q-item-section>
                        <q-item-label>Отзывы <span class="text-white q-pl-sm text-h5">50</span></q-item-label>
                    </q-item-section>
                </q-item>
                <q-item class="star">
                    <q-item-section>
                        <q-item-label>
                            Рейтинг: <span class="text-white q-px-md  text-h5"></span>
                            Продаж: <span class="text-white q-px-md   text-h5">20</span>
                            покупок: <span class="text-white  q-px-md text-h5">30</span>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
        <hr class="q-my-xl">
        <div class="reviews_body">
            <div class="text-white reviews_body-title q-mb-xl">Отзывы</div>
            <div class=" ">
                <div class="flex items-center justify-between  reviews_body_card q-mb-xl">
                    <div class="reviews_body_card__image q-ml-xl">
                        <q-img
                                src='~src/assets/foto_profile.png'
                                spinner-color="white"
                                width="21px"
                                height="21px"

                        />
                    </div>
                    <q-list class="flex justify-between col-grow">
                        <div class="flex justify-between ">
                            <div class="">
                                <q-item class=" q-mr-md flex column" style="max-width: 350px">
                                    <q-item-section>
                                        <q-item-label class="text-white q-pb-md">Ivan Mazepa</q-item-label>
                                    </q-item-section>
                                    <div class="flex">
                                        <q-item-section side top v-for="n of 5" class="q-pl-sm ">
                                            <q-icon name="star" color="yellow"/>
                                        </q-item-section>
                                    </div>
                                </q-item>
                            </div>
                            <q-item class=" q-mr-md">
                                <q-item-section>
                                    <q-item-label class="text-yellow">50 отзывов за 1 месяц</q-item-label>
                                </q-item-section>
                            </q-item>
                        </div>
                        <div class="q-mr-lg">
                            <q-select
                                    rounded
                                    v-model="sortedStar"
                                    :options="options"
                                    :option-label="(item) => item === null ? 'Null value' : item.label"
                                    :option-value="(item) => item === null ? 'Null value' : item.value"
                                    dark
                                    style="min-width: 435px;"
                                    clearable
                                    outlined
                                    :select="filteredList(sortedStar.value)"
                            />
                        </div>
                    </q-list>
                </div>

                <div class="flex items-center justify-between  reviews_body_card q-mb-md" v-for="item of filtered">
                    <div class="reviews_body_card__image q-ml-xl">
                        <q-img
                                src='~src/assets/foto_profile.png'
                                spinner-color="white"
                                width="21px"
                                height="21px"

                        />
                    </div>
                    <q-list class="flex justify-between col-grow">
                        <div class="flex justify-between ">
                            <div>
                                <q-item class=" q-mr-md flex column" style="max-width: 350px">
                                    <q-item-section>
                                        <q-item-label
                                                class="q-pb-md">
                                            {{ item.name }}
                                            <span class="text-orange q-pl-md">
                                                {{ item.product }}
                                            </span>
                                        </q-item-label>
                                    </q-item-section>
                                    <div class="flex">
                                        <q-item-section side top class="q-pl-sm ">
                                            {{ item.reviews }}
                                        </q-item-section>
                                    </div>
                                </q-item>
                            </div>
                        </div>
                        <div class="q-mr-lg">
                            <q-item class=" q-mr-md " style="max-width: 350px">
                                <q-item-section>
                                    <q-item-label class="text-grey">Этот месяц</q-item-label>
                                </q-item-section>
                                <q-item-section side top v-for="n of item.star" class="q-pl-sm ">
                                    <q-icon name="star" color="yellow"/>
                                </q-item-section>
                            </q-item>
                        </div>
                    </q-list>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <q-btn class="add_reviews q-mt-xl" @click="store.LOAD_NEXT_PERSON()">Показать больше отзывов</q-btn>
        </div>
    </q-page>
</template>

<script setup>
import {faker} from '@faker-js/faker';
import {computed, ref} from "vue";
import {personReviews} from "stores/person-store";
const store = personReviews()
let sortedStar = ref('Все отзывы')
let person = store.SET_PERSON
store.GET_PERSON_FROM_FAKER()
let sortedarray = ref([])


const filtered = computed(() => {
    if (sortedarray.value.length) {
        return sortedarray.value
    } else {
        return person.value
    }
})

const filteredList = (filter) => {
    sortedarray.value.length = 0
    person.value.map((elem) => {
        if (elem.star === filter) {
            sortedarray.value.push(elem)
        } else {
            return
        }
    })
}

let options = [
    {label: 'Все отзывы', value: ''},
    {label: 'Отличные отзывы', value: 5},
    {label: 'Хорошие отзывы', value: 4},
    {label: 'Нормальные отзывы', value: 3},
    {label: 'Плохие отзывы', value: 2},
    {label: 'Ужасные отзывы', value: 1},
]
</script>
<style>
.star {
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.03);
    box-shadow: 2px 0px 10px 0px rgba(6, 3, 9, 0.05), 30px 25px 48px 8px rgba(6, 3, 9, 0.10);
    backdrop-filter: blur(5px);
    color: #7D7781;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 17px 20px;
}

.reviews_body-title {
    color: var(--ffffff, #FFF);
    font-family: Montserrat;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
}

.reviews_body_card {
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.03);
    box-shadow: 2px 0px 10px 0px rgba(6, 3, 9, 0.05), 30px 25px 48px 8px rgba(6, 3, 9, 0.10);
    backdrop-filter: blur(5px);
    min-width: 1280px;
    min-height: 120px;
    width: 100%;
}

.reviews_body_card__image {
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(255, 255, 255, 0.03);
    box-shadow: 2px 0px 10px 0px rgba(6, 3, 9, 0.05), 30px 25px 48px 8px rgba(6, 3, 9, 0.10);
    backdrop-filter: blur(5px);
    padding: 19px;
}

.add_reviews {
    padding: 23px 30px;
    border-radius: 20px;
    border: 1px solid #FF9839;
    color: #FFF;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}
</style>
