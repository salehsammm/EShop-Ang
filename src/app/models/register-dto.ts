export class RegisterDto {
    fName: string;
    lName: string;
    phoneNumber: string;
    username: string;
    password: string;
    rePassword: string;

    constructor(fName: string,lName: string,phoneNumber: string,username:string , password:string,rePassword: string) {        
        this.fName = fName;
        this.lName = lName;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
        this.rePassword = rePassword;
    }
}
