<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proyecto;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProyectoController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/proyectos",
     *     operationId="getProyectos",
     *     tags={"Proyectos"},
     *     summary="Get list of proyectos",
     *     description="Returns list of proyectos",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Proyecto")
     *         )
     *     )
     * )
     */
    public function index()
    {
        return response()->json(Proyecto::all());
    }

    /**
    /**
     * @OA\Post(
     *     path="/api/proyectos",
     *     operationId="createProyecto",
     *     tags={"Proyectos"},
     *     summary="Create a new proyecto",
     *     description="Creates a new proyecto",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ProyectoInput")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Proyecto created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Proyecto")
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
                'observaciones' => 'nullable|string|max:255',
                'plano_url' => 'nullable|url|max:500',
                'plano_json' => 'nullable|json',
                'id_cliente' => 'nullable|uuid|exists:clientes,id_cliente',
            ]);

            $proyecto = Proyecto::create($validatedData);
            return response()->json($proyecto, 201); // 201 Created
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $e->errors()
            ], 422); // 422 Unprocessable Entity
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating proyecto',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    /**
     * @OA\Get(
     *     path="/api/proyectos/{id}",
     *     operationId="getProyectoById",
     *     tags={"Proyectos"},
     *     summary="Get proyecto by ID",
     *     description="Returns a single proyecto",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of proyecto to return",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Proyecto")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Proyecto not found"
     *     )
     * )
     */
    public function show(Proyecto $proyecto)
    {
        return response()->json($proyecto);
    }

    /**
     * @OA\Put(
     *     path="/api/proyectos/{id}",
     *     operationId="updateProyecto",
     *     tags={"Proyectos"},
     *     summary="Update an existing proyecto",
     *     description="Updates a proyecto",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of proyecto to update",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/ProyectoInput")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Proyecto updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Proyecto")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Proyecto not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function update(Request $request, Proyecto $proyecto)
    {
        try {
            $validatedData = $request->validate([
                'observaciones' => 'sometimes|nullable|string|max:255',
                'plano_url' => 'sometimes|nullable|url|max:500',
                'plano_json' => 'sometimes|nullable|json',
                'id_cliente' => 'sometimes|nullable|uuid|exists:clientes,id_cliente',
            ]);

            $proyecto->update($validatedData);
            return response()->json($proyecto);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating proyecto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/proyectos/{id}",
     *     operationId="deleteProyecto",
     *     tags={"Proyectos"},
     *     summary="Delete a proyecto",
     *     description="Deletes a single proyecto",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of proyecto to delete",
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
     *         description="Proyecto not found"
     *     )
     * )
     */
    public function destroy(Proyecto $proyecto)
    {
        try {
            $proyecto->delete();
            return response()->json(null, 204); // 204 No Content
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting proyecto',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
