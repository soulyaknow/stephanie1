<template>
    <div class="min-h-screen w-screen flex flex-col bg-gradient-to-r from-yellow-200 via-yellow-50 to-white">
        <nav class="bg-white sticky top-0 z-50">
            <div class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <div class="text-[20px] bg-yellow-400 text-white w-20 rounded text-center">
                        <router-link to="/">Back</router-link>
                    </div>
                </div>
            </div>
        </nav>
        <div class="flex-grow max-w-screen max-h-full flex flex-col items-center justify-between mx-auto">
            <div class="my-auto mx-auto h-96 w-80 md:mt-20 p-4 transparent rounded-2xl">
                <h1 class="text-[25px] md:text-[30px] lg:text-[35px] text-black pb-4 text-center font-bold">My Diary</h1>
                <div>
                    <label for="Date">Date Created</label>
                    <input type="date" class="border border-black w-full text-center" v-model="myDate">
                </div>
                <div class="mt-10">
                    <label for="myDiary">Content</label>
                    <textarea v-model="myDiary" id="outputText" rows="4" class="w-full text-left border border-black pl-2" placeholder="Input Text Here...."></textarea>
                </div>             
                <div class="flex justify-center md:mt-4 mt-4">
                    <button class="bg-blue-400 h-10 rounded text-white hover:bg-blue-500 w-20 mx-2" @click="saveText">Save Diary</button>
                    <button class="bg-green-400 h-10 rounded text-white hover:bg-green-500 w-20 mx-2" @click="toggleDiary">
                        {{ isClick ? 'Hide Diary' : 'View Diary' }}
                    </button>
                </div>
            </div>
            <div v-if="isClick"
            class="my-auto mx-auto h-full w-full md:mt-20 mt-10 p-4 transparent rounded-2xl">
                <div class="grid md:grid-cols-3 lg:grid-cols-3 grid-col-1 gap-10">
                    <div v-for="diary in diarys" :key="diary.id"
                    class="list-of-diary md:w-96 w-full md:h-52 h-full border-2 border-black flex flex-col justify-between">
                        <p>
                            {{ capitalizeFirstLetter(diary.content) }}
                        </p>
                        <span class="text-right">Date Created: {{(diary.date).toUpperCase()}}</span>
                    </div>
                </div>               
            </div>  
        </div>
        <footer class="bg-white rounded-lg  dark:bg-gray-800 mt-10">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    Design with: Stephanie
                </span>
                <span class="flex flex-wrap items-center  text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    -@Reference by Akhil
                </span>
            </div>
        </footer>
    </div>
</template>
<script setup>
import { db } from '../firebase';
import { ref, onMounted } from 'vue';
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query } from 'firebase/firestore';

const myDiary = ref('');
const myDate = ref('')
const diarys = ref([]);
const isClick = ref(false)

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const saveText = async (e) => {
      e.preventDefault();
      try {
        await addDoc(collection(db, 'diary'), {
          content: myDiary.value,
          date: myDate.value,
          date_created: serverTimestamp(),
        });
        myDiary.value = '';
      } catch (e) {
        console.error('Error adding document: ', e);
      }
};

const getData = () => {
      const fsquery = query(collection(db, "diary"), orderBy('date_created','asc'));
      onSnapshot(fsquery,(querySnapshot) => {
        const newDiary = [];
        querySnapshot.forEach((doc) => {
          const datas = {
              id: doc.id,
              content: doc.data().content,
              date: doc.data().date,
            }
            newDiary.unshift(datas);
        });
        diarys.value=newDiary;
      })
};

const toggleDiary = () => {
  isClick.value = !isClick.value;
};

onMounted(()=> {
    getData()
})

</script>
<style scoped>

</style>