<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pago;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PagoController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/pagos",
     *     operationId="getPagos",
     *     tags={"Pagos"},
     *     summary="Get list of pagos",
     *     description="Returns list of pagos",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Pago")
     *         )
     *     )
     * )
     */
    public function index()
    {
        return response()->json(Pago::all());
    }

    /**
    /**
     * @OA\Post(
     *     path="/api/pagos",
     *     operationId="createPago",
     *     tags={"Pagos"},
     *     summary="Create a new pago",
     *     description="Creates a new pago",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/PagoInput")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Pago created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Pago")
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
                'id_cot' => 'required|exists:cotizaciones,id_cotizacion',
                'metodo' => 'required|string|max:100',
                // 'fec_pago' is automatically set by the database using useCurrent()
                'cantidad' => 'required|numeric|min:0',
            ]);

            $pago = Pago::create($validatedData);
            return response()->json($pago, 201); // 201 Created
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $e->errors()
            ], 422); // 422 Unprocessable Entity
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error creating pago',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    /**
     * @OA\Get(
     *     path="/api/pagos/{id}",
     *     operationId="getPagoById",
     *     tags={"Pagos"},
     *     summary="Get pago by ID",
     *     description="Returns a single pago",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of pago to return",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation",
     *         @OA\JsonContent(ref="#/components/schemas/Pago")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Pago not found"
     *     )
     * )
     */
    public function show(Pago $pago)
    {
        return response()->json($pago);
    }

    /**
     * @OA\Put(
     *     path="/api/pagos/{id}",
     *     operationId="updatePago",
     *     tags={"Pagos"},
     *     summary="Update an existing pago",
     *     description="Updates a pago",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of pago to update",
     *         required=true,
     *         @OA\Schema(
     *             type="integer"
     *         )
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/PagoInput")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Pago updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Pago")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Pago not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function update(Request $request, Pago $pago)
    {
        try {
            $validatedData = $request->validate([
                'id_cot' => 'sometimes|required|exists:cotizaciones,id_cotizacion',
                'metodo' => 'sometimes|required|string|max:100',
                'cantidad' => 'sometimes|required|numeric|min:0',
            ]);

            $pago->update($validatedData);
            return response()->json($pago);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating pago',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * @OA\Delete(
     *     path="/api/pagos/{id}",
     *     operationId="deletePago",
     *     tags={"Pagos"},
     *     summary="Delete a pago",
     *     description="Deletes a single pago",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         description="ID of pago to delete",
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
     *         description="Pago not found"
     *     )
     * )
     */
    public function destroy(Pago $pago)
    {
        try {
            $pago->delete();
            return response()->json(null, 204); // 204 No Content
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error deleting pago',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
