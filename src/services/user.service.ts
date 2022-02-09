import { UpdateUserDto } from "dto/updateUser.dto";
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    DocumentData,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase.config";
import { UserModel } from "../models/user.model";

const usersRef = collection(db, "users");

export class UserService {
    async create(userData: UserModel) {
        try {
            const userRef = await addDoc(usersRef, userData);
            return userRef.id;
        } catch (error) {
            console.log(error);
        }
    }

    async findAll() {
        try {
            const usersSnap = await getDocs(usersRef);
            const users: DocumentData[] = [];

            usersSnap.forEach((doc) => {
                const user = {
                    id: doc.id,
                    ...doc.data(),
                };
                users.push(user);
            });

            return users;
        } catch (error) {
            console.log(error);
        }
    }

    async findById(id: string) {
        try {
            const userSnap = await getDoc(doc(usersRef, id));
            if (!userSnap.exists()) {
                return { message: "Not found" };
            }
            return userSnap.data();
        } catch (error) {
            console.log(error);
        }
    }

    async updateById(userData: UpdateUserDto) {
        try {
            const user = await updateDoc(doc(usersRef, userData.id), {
                firstName: userData.firstName,
                lastName: userData.lastName,
                age: userData.age,
            });

            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id: string) {
        try {
            await deleteDoc(doc(usersRef, id));
            return "Success";
        } catch (error) {
            console.log(error);
        }
    }
}
