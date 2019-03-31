export class Vector3D {

    static X_AXIS: Vector3D = new Vector3D(1, 0, 0);
    static Y_AXIS: Vector3D = new Vector3D(0, 1, 0);
    static Z_AXIS: Vector3D = new Vector3D(0, 0, 1);

    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    get length(): number {
        return Math.sqrt(this.lengthSquared);
    }

    get lengthSquared(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public static angleBetween(a: Vector3D, b: Vector3D): number {
        return Math.acos(a.dotProduct(b) / (a.length * b.length));
    }

    /**
     * [static] Returns the distance between two points.
     */
    public static distance(pt1: Vector3D, pt2: Vector3D): number {
        var x: number = (pt1.x - pt2.x);
        var y: number = (pt1.y - pt2.y);
        var z: number = (pt1.z - pt2.z);
        return Math.sqrt(x * x + y * y + z * z);
    }

    public add(a: Vector3D): Vector3D {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this
    }

    public sub(a: Vector3D): Vector3D {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z;
        return this;
    }

    /**
     * 是否为0向量
     */
    public get isZero(): boolean {
        return ((this.x === 0) && (this.y === 0) && (this.z === 0));
    }

    public equals(toCompare: Vector3D, allFour: boolean = false): boolean {
        return (this.x === toCompare.x && this.y === toCompare.y && this.z === toCompare.z && (allFour ? this.w === toCompare.w : true));
    }

    public nearEquals(toCompare: Vector3D, tolerance: number = 0.0001, allFour: boolean = false): boolean {
        let abs: Function = Math.abs;
        return ((abs(this.x - toCompare.x) < tolerance) && (abs(this.y - toCompare.y) < tolerance) && (abs(this.z - toCompare.z) < tolerance) && (allFour ? (abs(this.w - toCompare.w) < tolerance) : true));
    }

    public clone(): Vector3D {
        return new Vector3D(this.x, this.y, this.z, this.w);
    }

    /**
     * Copies all of vector data from the source Vector3D object into the calling Vector3D object.
     */
    public copyFrom(sourceVector3D: Vector3D): void {
        this.x = sourceVector3D.x;
        this.y = sourceVector3D.y;
        this.z = sourceVector3D.z;
        this.w = sourceVector3D.w;
    }

    /**
     * Sets the members of Vector3D to the specified values
     */
    public setTo(xa: number, ya: number, za: number): void {
        this.x = xa;
        this.y = ya;
        this.z = za;
    }

    public negate(): void {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
    }

    public scaleBy(s: number): void {
        this.x *= s;
        this.y *= s;
        this.z *= s;
    }

    public normalize(): number {
        var leng: number = this.length;
        if (leng != 0)
            this.scaleBy(1 / leng);
        return leng;
    }

    public crossProduct(a: Vector3D): Vector3D {
        return new Vector3D(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x);
    }

    public dotProduct(a: Vector3D): number {
        return (this.x * a.x + this.y * a.y + this.z * a.z);
    }

    public project(): void {
        if (this.w == 0) return;
        this.x /= this.w;
        this.y /= this.w;
        this.z /= this.w;
    }

    public toString(): string {
        return "[Vector3D] (x:" + this.x + " ,y:" + this.y + ", z:" + this.z + ", w:" + this.w + ")";
    }


}