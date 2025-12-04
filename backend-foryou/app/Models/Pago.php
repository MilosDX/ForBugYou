<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Pago",
 *     type="object",
 *     title="Pago",
 *     required={"id_cot", "metodo", "cantidad"},
 *     @OA\Property(property="id_pago", type="integer", format="int64", description="ID del pago"),
 *     @OA\Property(property="id_cot", type="integer", format="int64", description="ID de la cotización asociada"),
 *     @OA\Property(property="metodo", type="string", description="Método de pago"),
 *     @OA\Property(property="fec_pago", type="string", format="date-time", description="Fecha del pago"),
 *     @OA\Property(property="cantidad", type="number", format="float", description="Monto del pago"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Fecha de creación"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Fecha de actualización")
 * )
 *
 * @OA\Schema(
 *     schema="PagoInput",
 *     type="object",
 *     title="Pago Input",
 *     required={"id_cot", "metodo", "cantidad"},
 *     @OA\Property(property="id_cot", type="integer", format="int64", description="ID de la cotización asociada"),
 *     @OA\Property(property="metodo", type="string", description="Método de pago"),
 *     @OA\Property(property="cantidad", type="number", format="float", description="Monto del pago")
 * )
 */
class Pago extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_pago';

    protected $fillable = [
        'id_cot',
        'metodo',
        'fec_pago',
        'cantidad',
    ];

    protected $casts = [
        'fec_pago' => 'datetime',
    ];

    public function cotizacion()
    {
        return $this->belongsTo(Cotizacion::class, 'id_cot', 'id_cotizacion');
    }
}
