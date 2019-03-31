export declare class Vector3D {
    static X_AXIS: Vector3D;
    static Y_AXIS: Vector3D;
    static Z_AXIS: Vector3D;
    x: number;
    y: number;
    z: number;
    w: number;
    constructor(x?: number, y?: number, z?: number, w?: number);
    readonly length: number;
    readonly lengthSquared: number;
    static angleBetween(a: Vector3D, b: Vector3D): number;
    /**
     * [static] Returns the distance between two points.
     */
    static distance(pt1: Vector3D, pt2: Vector3D): number;
    add(a: Vector3D): Vector3D;
    sub(a: Vector3D): Vector3D;
    /**
     * 是否为0向量
     */
    readonly isZero: boolean;
    equals(toCompare: Vector3D, allFour?: boolean): boolean;
    nearEquals(toCompare: Vector3D, tolerance?: number, allFour?: boolean): boolean;
    clone(): Vector3D;
    /**
     * Copies all of vector data from the source Vector3D object into the calling Vector3D object.
     */
    copyFrom(sourceVector3D: Vector3D): void;
    /**
     * Sets the members of Vector3D to the specified values
     */
    setTo(xa: number, ya: number, za: number): void;
    negate(): void;
    scaleBy(s: number): void;
    normalize(): number;
    crossProduct(a: Vector3D): Vector3D;
    dotProduct(a: Vector3D): number;
    project(): void;
    toString(): string;
}
