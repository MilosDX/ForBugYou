<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MaterialController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/materiales",
     *     operationId="getMateriales",
     *     tags={"Materiales"},
     *     summary="Get list of materiales",
     *     description="Returns list of materiales",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Material")
     *         )
     *     )
     * )
     */
    public function index()
    {
        return response()->json(Material::all());
    }

    /**
    /**
     * @OA\Post(
     *     path="/api/materiales",
     *     operationId="createMaterial",
     *     tags={"Materiales"},
     *     summary="Create a new material",
     *     description="Creates a new material",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/MaterialInput")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Material created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Material")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nombre' => 'required|string|max:255',
                'stock' => 'required|numeric|min:0',
                'costo_unitario' => 'required|numeric|min:0',
            ]);

            $material = Material::create($validatedData);
            return response()->json($material, 201); // 201 Created
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $e->errors()
            ], 422); // 422 Unprocessable Entity
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating material',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    /**
     * @OA\Get(
     *     path="/api/materiales/{id}",
     *     operationId="getMaterialById",
     *     tags={"Materiales"},
     *     summary="Get material by ID",
     *     description="Returns a single material",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of material to return",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Material")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Material not found"
     *     )
     * )
     */
    public function show(Material $material)
    {
        return response()->json($material);
    }

    /**
     * @OA\Put(
     *     path="/api/materiales/{id}",
     *     operationId="updateMaterial",
     *     tags={"Materiales"},
     *     summary="Update an existing material",
     *     description="Updates a material",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of material to update",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/MaterialInput")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Material updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Material")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Material not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function update(Request $request, Material $material)
    {
        try {
            $validatedData = $request->validate([
                'nombre' => 'sometimes|required|string|max:255',
                'stock' => 'sometimes|required|numeric|min:0',
                'costo_unitario' => 'sometimes|required|numeric|min:0',
            ]);

            $material->update($validatedData);
            return response()->json($material);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating material',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/materiales/{id}",
     *     operationId="deleteMaterial",
     *     tags={"Materiales"},
     *     summary="Delete a material",
     *     description="Deletes a single material",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of material to delete",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="No content"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Material not found"
     *     )
     * )
     */
    public function destroy(Material $material)
    {
        try {
            $material->delete();
            return response()->json(null, 204); // 204 No Content
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting material',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
