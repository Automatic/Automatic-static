<?php

final class ArcanistESLintEngine extends ArcanistLintEngine {

  public function buildLinters() {

    $paths = $this->getPaths();
    $linter = new ArcanistESLintLinter();

    foreach($paths as $path) {
      $linter->addPath($paths[0]);
    }

    return array(
      $linter
    );
  }

}
