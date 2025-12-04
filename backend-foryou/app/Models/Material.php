<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Material",
 *     type="object",
 *     title="Material",
 *     required={"nombre", "stock", "costo_unitario"},
 *     @OA\Property(
 *         property="id_material",
 *         type="integer",
 *         format="int64",
 *         description="ID unico del material"
 *     ),
 *     @OA\Property(
 *         property="nombre",
 *         type="string",
 *         description="Nombre del material"
 *     ),
 *     @OA\Property(
 *         property="stock",
 *         type="number",
 *         format="float",
 *         description="Cantidad en stock"
 *     ),
 *     @OA\Property(
 *         property="costo_unitario",
 *         type="number",
 *         format="float",
 *         description="Costo por unidad del material"
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="Fecha de creacion"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="Fecha de actualizacion"
 *     )
 * )
 *
 * @OA\Schema(
 *     schema="MaterialInput",
 *     type="object",
 *     title="Material Input",
 *     required={"nombre", "stock", "costo_unitario"},
 *     @OA\Property(property="nombre", type="string", description="Nombre del material"),
 *     @OA\Property(property="stock", type="number", format="float", description="Cantidad en stock"),
 *     @OA\Property(property="costo_unitario", type="number", format="float", description="Costo por unidad del material")
 * )
 */
class Material extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_material';

    protected $fillable = [
        'nombre',
        'stock',
        'costo_unitario',
    ];

    public function cotizaciones()
    {
        return $this->belongsToMany(Cotizacion::class, 'materiales_cotizacion', 'id_mat', 'id_cot')
                    ->withPivot('cant_usa', 'costo_unitario')
                    ->withTimestamps();
    }

    public function proyectos()
    {
        return $this->belongsToMany(Proyecto::class, 'material_proyecto', 'id_material', 'id_proyecto')
                    ->withPivot('cant_usada')
                    ->withTimestamps();
    }
}
