<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Proyecto",
 *     type="object",
 *     title="Proyecto",
 *     @OA\Property(property="id_proyecto", type="integer", format="int64", description="ID del proyecto"),
 *     @OA\Property(property="observaciones", type="string", description="Observaciones del proyecto"),
 *     @OA\Property(property="plano_url", type="string", format="url", description="URL del plano"),
 *     @OA\Property(property="plano_json", type="object", description="JSON del plano"),
 *     @OA\Property(property="id_cliente", type="string", format="uuid", description="ID del cliente asociado"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Fecha de creación"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Fecha de actualización")
 * )
 *
 * @OA\Schema(
 *     schema="ProyectoInput",
 *     type="object",
 *     title="Proyecto Input",
 *     @OA\Property(property="observaciones", type="string", description="Observaciones del proyecto"),
 *     @OA\Property(property="plano_url", type="string", format="url", description="URL del plano"),
 *     @OA\Property(property="plano_json", type="object", description="JSON del plano"),
 *     @OA\Property(property="id_cliente", type="string", format="uuid", description="ID del cliente asociado")
 * )
 */
class Proyecto extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_proyecto';

    protected $fillable = [
        'observaciones',
        'plano_url',
        'plano_json',
        'id_cliente',
    ];

    protected $casts = [
        'plano_json' => 'array',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class, 'id_cliente', 'id_cliente');
    }

    public function materiales()
    {
        return $this->belongsToMany(Material::class, 'material_proyecto', 'id_proyecto', 'id_material')
                    ->withPivot('cant_usada')
                    ->withTimestamps();
    }
}
