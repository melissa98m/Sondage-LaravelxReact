<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $questions = Question::with(['sondage'])
            ->orderBy('sondage')
            ->get();
        return response()->json([
            'status' => 'Success',
            'data' => $questions,
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
            'value' => 'required',
        ]);
        $question = Question::create([
            'value' => $request->value,
            'sondage' => $request->sondage,
        ]);
        $question->sondage = $question->sondage()->get()[0];
        return response()->json(['status' => 'Success', 'data' => $question]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function show(Question $question)
    {
        $question->load(['sondage']);
        return response()->json($question);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Question $question)
    {
        $this->validate($request, [
            'value' => 'required',

        ]);
        $question->update([
            'value' => $request->value,
            'sondage' => $request->sondage,
        ]);
        $question->sondage = $question->sondage()->get()[0];
        return response()->json(['status' => 'Success', 'data' => $question]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Question  $question
     * @return \Illuminate\Http\Response
     */
    public function destroy(Question $question)
    {
        $question->delete();
        return response()->json(['status' => 'Supprimer avec succès']);
    }
}
