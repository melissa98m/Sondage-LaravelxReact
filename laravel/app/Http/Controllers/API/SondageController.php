<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Sondage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SondageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sondages = DB::table('sondages')
            ->get()
            ->toArray();
        return response()->json(['status' => 'Success', 'data' => $sondages]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $sondage = Sondage::create([
            'name' => $request->name,
        ]);
        return response()->json(['status' => 'Success', 'data' => $sondage]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sondage  $sondage
     * @return \Illuminate\Http\Response
     */
    public function show(Sondage $sondage)
    {
        return response()->json($sondage);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sondage  $sondage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sondage $sondage)
    {
        $this->validate($request, [
            'name' => 'required',
        ]);
        // On crée un nouvel utilisateur
        $sondage->update([
            'name' => $request->name,

        ]);
        // On retourne les informations du nouvel utilisateur en JSON
        return response()->json(['status' => 'Success', 'data' => $sondage]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sondage  $sondage
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sondage $sondage)
    {
        $sondage->delete();
        // On retourne la réponse JSON
        return response()->json([
            'status' => 'Supprimer avec succès avec succèss'
        ]);
    }
}
