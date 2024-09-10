export class User {
    UserId: number;
    Name: string;
    Email: string;
    Password: string;
    ContactNo: string;
    Role: string;

    constructor() {
        this.UserId = 0;
        this.Name = '';
        this.Email = '';
        this.Password = '';
        this.ContactNo = '';
        this.Role = 'Customer';
    }
}

export class Login {
    Password: string;
    ContactNo: string;
    
    constructor() {
        this.Password = '';
        this.ContactNo = '';
    }
}