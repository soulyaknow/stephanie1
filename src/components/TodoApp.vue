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
        <div class="flex-grow max-w-screen-xl max-h-full flex flex-col items-center justify-between mx-auto">
            <div class="my-auto mx-auto md:h-[500px] h-full md:w-[500px] w-full md:mt-20 p-4 transparent rounded-2xl overflow-y-scroll">
                <h1 class="text-[25px] md:text-[30px] lg:text-[35px] text-slate-950 pb-4 font-bold text-center">Todo App</h1>
                <div class="flex items-center space-x-2 mb-4">
                    <input type="text" class="border p-2 rounded-md w-full" v-model="task" placeholder="Add a new task" />
                    <button class="bg-yellow-400 text-white px-4  rounded-md text-[25px] h-10" @click="addTask">Add</button>
                </div>
                <input type="text" class="border border-gray-300 p-2 rounded-md w-full mb-4" placeholder="Search tasks" v-model="searchQuery"/>
                <div class="flex flex-col mb-4">
                    <div class="flex mb-2 items-center header w-full h-10 bg-yellow-300 text-slate-800 text-center">
                        <p class="flex-1 py-6">Details</p>
                        <p class="flex-1 py-6">Action</p>
                    </div>
                    <div class="flex items-center header h-full w-full transparent text-gray-400 text-center" v-for="todo in filteredTodos" :key="todo.id">
                        <div class="datas flex w-full h-full py-2 bg-gray-100 text-white rounded-full mb-2">
                            <p class="flex-1 text-[20px] text-slate-600" :class="{ check: todo.status }">{{ capitalizeFirstLetter(todo.details) }}</p>
                            <p class="flex-1">
                                <a href="#" class="mx-2 bg-green-500 rounded text-[20px] " @click="updateData(todo.id, todo.status)">
                                    {{ isClick ? 'Undone' : 'Done' }}
                                </a>
                                <a href="#" @click="removeTask(todo.id)" class="bg-red-500 rounded text-[20px]">
                                    Delete
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex mt-4 text-center transparent mr-auto">
                    <button class="items-center header w-full h-10  rounded-full bg-yellow-300 text-slate-950 text-center hover:bg-yellow-400" 
                        v-if="hasTasks" @click="clearAllTasks">
                        Clear All
                    </button>
                </div>
            </div>
        </div>
        <footer class="bg-white rounded-lg  dark:bg-gray-800">
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
import { ref, onMounted, computed } from 'vue';
import { collection, addDoc, serverTimestamp, onSnapshot, orderBy, query, doc, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';

const task = ref('');
const todos = ref([]);
const searchQuery = ref('');
const status = ref(false);
const isClick = ref(false)

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const addTask = async (e) => {
      e.preventDefault();
      try {
        await addDoc(collection(db, 'todo'), {
          details: task.value,
          status: status.value,
          date_created: serverTimestamp(),
        });
        task.value = '';
      } catch (e) {
        console.error('Error adding document: ', e);
      }
};

const getData = () => {
      const fsquery = query(collection(db, "todo"), orderBy('date_created','asc'));
      onSnapshot(fsquery,(querySnapshot) => {
        const newTasks = [];
        querySnapshot.forEach((doc) => {
          const datas = {
              id:doc.id,
              details:doc.data().details,
              status:doc.data().status,
            }
            newTasks.unshift(datas);
        });
        todos.value=newTasks;
      })
};

const updateData = (id, currentStatus) => {
      const fsquery = doc(db, 'todo', id);
      const newData = {
        status: !currentStatus,
      }
      isClick.value = !isClick.value;
      updateDoc(fsquery, newData)
      .then(() => {
        console.log('Document successfully updated.');
      })
      .catch((error) => {
        console.error('Error updating document:', error);
      });
};

const removeTask = async (id) => {
      try{
        await deleteDoc(doc(db,'todo',id))
      }catch(e){
        console.log(e);
      }
};

const hasTasks = computed(()=> {
      return todos.value.length > 0;
});

const clearAllTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'todo'));
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        todos.value = [];
      } catch (e) {
        console.log(e);
      }
};
const filteredTodos = computed(()=> {
      return todos.value.filter(todo => {
        return todo.details.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
});

onMounted(()=> {
    getData()
})
</script>
<style scoped>
.visible {
  display: block !important;
}
.overflow-y-scroll::-webkit-scrollbar {
    display: none;
    width: 0px;
}
.overflow-y-scroll:hover::-webkit-scrollbar {
    display: block;
}
.overflow-y-scroll::-webkit-scrollbar-track {
    background-color: transparent;
}
.overflow-y-scroll::-webkit-scrollbar-thumb {
    background-color: rgb(8, 47, 73, 1);
    border-radius: 8px;
    width: 4px;
} 
.check {
    text-decoration: line-through;
    color: red;
}
</style>