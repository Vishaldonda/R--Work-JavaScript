interface User {
    id: number;
    name: string;
    age: number;
    grade: string;
    mark: number;
}


var arrdata = [
    {"id":1,"name":"John Doe","age":20,"grade":"A","mark":88},
    {"id":2,"name":"Jane Smith","age":22,"grade":"B","mark":61}
]

const newUser: User[] = arrdata;