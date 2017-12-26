export class Point {
    //camel case
    constructor(private _x: number, private _y: number) { }



    somaPoints() {
        return this._x + this._y;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        if (value < 0)
            throw new Error('Valor nao pode ser menor q zero');

        this._x = value;
    }


    soma(x, y) {
        return x + y;
    }
}

export class LikeComponent{


    constructor(private _likesCount: number, private _isSelected: boolean) { }


    get likesCount() {
        return this._likesCount;
    }

    get isSelected() {
        return this._isSelected;
    }

    onClick()
    {
        //if (this.isSelected) {
        //    this.likesCount--;
        //    this.isSelected = false

        //}
        //else
        //{
        //    this.likesCount++;
        //    this.isSelected = true;
        //}

        //refactorando esse lixo de cima!
        this._likesCount += (this._isSelected) ? -1 : +1;
        this._isSelected = !this._isSelected;

        

    }

}