<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Reponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReponseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reponses = Reponse::with(['question'])
            -groupBy('question', 'asc')
            ->get();
        return response()->json([
            'status' => 'Success',
            'data' => $reponses,
        ]);
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
            'reponse' => 'required',
        ]);
        $reponse = Reponse::create([
            'reponse' => $request->reponse,
            'question' => $request->question,
        ]);
        $reponse->question = $reponse->question()->get()[0];
        return response()->json(['status' => 'Success', 'data' => $reponse]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Reponse  $reponse
     * @return \Illuminate\Http\Response
     */
    public function show(Reponse $reponse)
    {
        $reponse->load(['question']);
        return response()->json($reponse);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Reponse  $reponse
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Reponse $reponse)
    {
        $this->validate($request, [
            'reponse' => 'required',

        ]);
        $reponse->update([
            'reponse' => $request->reponse,
            'question' => $request->question,
        ]);
        $reponse->question = $reponse->question()->get()[0];
        return response()->json(['status' => 'Success', 'data' => $reponse]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Reponse  $reponse
     * @return \Illuminate\Http\Response
     */
    public function destroy(Reponse $reponse)
    {
        $reponse->delete();
        return response()->json(['status' => 'Supprimer avec succès']);
    }


    public function getPourcentage(){
        $pourcentage = DB::table('reponses')
            ->select('question', 'reponse' , DB::raw('count(reponse)  as nbrReponse'))
            ->groupBy('reponse')
            ->orderBy('question')
            ->get();
        return response()->json(['status' => 'success' , 'data' => $pourcentage]);
    }
}
