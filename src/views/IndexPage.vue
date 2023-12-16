<template>
    <div class="min-h-screen w-screen flex flex-col">
        <nav class="bg-white sticky top-0 z-50">
            <div class="max-w-screen flex flex-wrap items-center justify-between mx-auto p-4">
                <div class="flex items-center space-x-3 rtl:space-x-reverse">
                    <div class="text-[30px] text-slate-950">Stephanie</div>
                </div>
                <button @click="navStore.showNavar"
                data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-yellow-400 hover:text-white focus:outline-none">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default"
                :class="{ visible: navStore.navarState }">
                    <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                    <li>
                        <a href="#home" class="block py-2 px-3 text-slate-950 md:bg-transparent md:p-0 hover:bg-yellow-400 hover:text-white rounded-md">Home</a>
                    </li>
                    <li>
                        <a href="#about" class="block py-2 px-3 text-slate-950 md:bg-transparent md:p-0 hover:bg-yellow-400 hover:text-white rounded-md">About</a>
                    </li>
                    <li>
                        <a href="#works" class="block py-2 px-3 text-slate-950 md:bg-transparent md:p-0 hover:bg-yellow-400 hover:text-white rounded-md">Works</a>
                    </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="flex-grow max-w-screen max-h-full flex flex-col items-center justify-between">
            <div class="grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 w-full h-full md:mb-20" id="home">
                <div class="bg-transparent h-full text-slate-950 md:block hidden pb-32">
                    <div class="flex flex-col mt-10 pt-20 ml-52">
                        <span>Hello</span>
                        <h1 class="text-left font-bold text-[50px]">I'm Stephanie</h1>
                        <p class="pb-2 text-[25px]">A Web Developer</p>
                        <button class="bg-yellow-300 text-slate-950 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 w-32 rounded hover:bg-yellow-400 ">Hire Me</button>
                    </div>
                </div>
                <div class="transparent h-full md:block hidden relative overflow-hidden">
                    <div class="sticky top-0 ml-32">
                        <!-- Back image -->
                        <img src="../assets/logo1.png" style="position: absolute; z-index: -1;" class="top-0 left-0 right-0 bottom-0">
                        <!-- Front image -->
                        <img src="../assets/panie.png" style="position: absolute; z-index: 1;" class="h-96 w-96">                        
                    </div>
                </div>
                <div class="transparent h-full md:hidden block relative">
                    <div class="h-full w-full relative">
                        <!-- Back image -->
                        <img src="../assets/logo1.png" class="h-full w-full object-cover" style="position: absolute; z-index: -1;" alt="Back Image">
                        <!-- Front image -->
                        <img src="../assets/panie.png" class="h-full w-full object-cover" style="position: relative; z-index: 1;" alt="Front Image">                        
                    </div>
                </div>
                <div class="bg-transparent h-full text-slate-950 md:hidden block">
                    <div class="flex flex-col pt-4 ml-2">
                        <div class="flex flex-col text-center">
                            <span>Hello</span>
                            <h1 class=" font-bold text-[50px]">I'm Stephanie</h1>
                            <p class="pb-2 text-[25px]">A Web Developer</p>
                        </div>
                    </div>  
                </div>         
            </div>
            <div class="flex flex-col text-center items-center w-full h-full pb-10" id="about">
                <h1 class="text-[25px] font-bold"><span class="border-b-2 border-b-yellow-500">About</span> Me</h1>
                <p class="mt-4 md:w-[800px] text-center">
                    "I am Stephanie, a fourth-year Information Technology student at Cordova Public College, deeply passionate about technology. 
                    Throughout my academic journey, I have actively engaged in the ever-evolving realm of programming. 
                    These experiences have provided me with a robust understanding of multiple programming languages, honed problem-solving skills, 
                    and a genuine enthusiasm for crafting effective and inventive solutions."
                </p>
                <p class="mt-4 md:w-[800px] text-center">
                    "In the world of technology, challenges are opportunities in disguise. 
                    Embrace them, learn from them, 
                    and let them fuel your growth."
                </p>
            </div>
            <div class="flex flex-col text-center items-center w-full h-full" id="works">
                <h1 class="text-[25px] font-bold"><span class="border-b-2 border-b-yellow-500">Portf</span>olio</h1>
                <p class="mt-4 md:w-[800px] text-center">
                    "Explore my diverse portfolio showcasing a blend of creativity and technical expertise. 
                    From innovative web development projects to dynamic applications, 
                    discover a collection that reflects my passion for crafting engaging digital experiences and solving complex challenges."
                </p>
                <button @click="togglePortfolio"
                    class="bg-yellow-300 text-slate-950 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 w-32 rounded hover:bg-yellow-400 mt-10">
                    {{ isClick ? 'Hide Portfolio' : 'View Works' }}
                </button>
            </div>
            <div v-if="isClick" class="flex flex-col text-center items-center w-full h-full" id="portfolio">
                <div class="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 w-full h-full" id="portfolio">
                    <div class="text-center px-10 py-10">
                        <h1 class="text-center text-[30px]">Todo App</h1>
                        <router-link to="/todoapp">
                            <img src="../assets/todo.png" class="mx-auto h-80 rounded-2xl">
                        </router-link>
                        <p class="text-left pt-4">
                            Users can create a list of tasks they need to complete, mark tasks as done, and often set deadlines or priorities. 
                            ToDo apps are popular productivity tools that help individuals stay organized and focused on their daily, weekly, or long-term goals. 
                        </p>
                    </div>
                    <div class="text-center px-10 py-10">
                        <h1 class="text-center text-[30px]">Diary App</h1>
                        <router-link to="/diary">
                            <img src="../assets/diary.png" class="mx-auto h-80 rounded-2xl">
                        </router-link>
                        <p class="text-left pt-4">
                            "These App Capture the moments of your life with our intuitive diary app. Express your thoughts, 
                            feelings, and experiences effortlessly. Seamlessly organize and revisit your memories anytime, 
                            anywhere. Your personal space for reflection and self-expression awaits."
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col text-center items-center w-full h-full" id="works">
                <div class="bg-yellow-300 w-full h-full pb-10">
                    <h1 class="font-bold text-[25px] py-8">Have any projects in mind?</h1>
                    <button class="bg-white text-slate-950 font-medium text-sm px-5 py-2.5 text-center me-2 mb-2 w-32 rounded hover:bg-gray-400 hover:text-white">Hire Me</button>
                </div>
            </div>
        </div>
        <footer class="transparent rounded-lg  my-4 dark:bg-gray-800">
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
import { useNavarStore } from '../stores/';
import {ref} from 'vue'

const isClick = ref(false)
const navStore = useNavarStore();

const togglePortfolio = () => {
  isClick.value = !isClick.value;
};
</script>
<style scoped>
.visible {
  display: block !important;
}
</style>