import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from './screens/DashboardScreen';
import LoadingScreen from './screens/LoadingScreen';
import RegisterScreen from './screens/RegisterScreen';
import FacultyScreen from './screens/FacultyScreen';
import CourseScreen from './screens/CourseScreen';
import NewCourseScreen from './screens/NewCourseScreen';
import CourseInfoScreen from './screens/CourseInfoScreen';

const BeforeSignin = createStackNavigator({
    Login: {
        screen: LoginScreen
    }
},
{
    headerMode: "none",
    initialRouteName: "Login"
})

const OnRegister = createStackNavigator({
    Register: {
        screen: RegisterScreen
    }
})

const AfterSignin = createStackNavigator({
    Dashboard: {
        screen: DashboardScreen
    }
},
{
    headerMode: "none",
    initialRouteName: "Dashboard"
})

const OnPressUniversity = createStackNavigator({
    Faculties: {
        screen: FacultyScreen
    }
},
{
    headerMode: "none",
    initialRouteName: "Faculties"
})

const OnPressFaculty = createStackNavigator({
    Courses: {
        screen: CourseScreen
    }
},
{
    headerMode: "none",
    initialRouteName: "Courses"
})

const OnCreateNewCourse = createStackNavigator({
    NewCourse: {
        screen: NewCourseScreen
    }
},
{
    headerMode: "none",
    initialRouteName: "NewCourse"
})

const OnPressCourse = createStackNavigator({
    CourseInfo: {
        screen: CourseInfoScreen
    }
},
{
    headerMode: "none",
    initialRouteName: "CourseInfo"
})

const AppNavigator = createStackNavigator({
    Auth: BeforeSignin,
    Register: OnRegister,
    App: AfterSignin,
    LoadingScreen: LoadingScreen,
    Faculties: OnPressUniversity,
    Courses: OnPressFaculty,
    NewCourse: OnCreateNewCourse,
    CourseInfo: OnPressCourse
},
{
    headerMode: "",
    initialRouteName: 'LoadingScreen'
})

export default createAppContainer(AppNavigator);
