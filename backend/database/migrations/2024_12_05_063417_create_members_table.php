<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('companyId');
            $table->date('jDate');
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->text('address');
            $table->string('designation');
            $table->string('gender');
            $table->string('bGroup');
            $table->string('fName');
            $table->string('mName');
            $table->integer('totalShare');
            $table->string('nidNo');
            $table->text('photo');
            $table->text('nidPhoto');
            $table->string('nName');
            $table->string('relationWithNominee');
            $table->text('nPhoto');
            $table->text('nNidPhoto');
            $table->text('mManualFormPhoto');
            $table->integer('status');
            $table->integer('createdBy');
            $table->integer('updatedBy');
            $table->foreign('companyId')->references('id')
            ->on('companies')
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};
