import {
  $createParagraphNode,
  DOMConversionMap,
  DOMConversionOutput,
  ElementNode,
  LexicalNode,
  RangeSelection,
  SerializedElementNode,
} from 'lexical';
import invariant from '../utils/invariant';

import { $isDayContainerNode } from './DayContainerNode';

type SerializedDayTitleNode = SerializedElementNode;

export function $convertSummaryElement(): DOMConversionOutput | null {
  const node = $createDayTitleNode();
  return {
    node,
  };
}

export class DayTitleNode extends ElementNode {
  static getType(): string {
    return 'day-title';
  }

  static clone(node: DayTitleNode): DayTitleNode {
    return new DayTitleNode(node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('summary');
    return dom;
  }

  updateDOM(): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      summary: () => {
        return {
          conversion: $convertSummaryElement,
          priority: 1,
        };
      },
    };
  }

  static importJSON(serializedNode: SerializedDayTitleNode): DayTitleNode {
    return $createDayTitleNode().updateFromJSON(serializedNode);
  }

  collapseAtStart(): boolean {
    this.getParentOrThrow().insertBefore(this);
    return true;
  }

  static transform(): (node: LexicalNode) => void {
    return (node: LexicalNode) => {
      invariant($isDayTitleNode(node), 'node is not a DayTitleNode');
      if (node.isEmpty()) {
        node.remove();
      }
    };
  }

  insertNewAfter(_: RangeSelection, restoreSelection = true): ElementNode {
    const containerNode = this.getParentOrThrow();

    if (!$isDayContainerNode(containerNode)) {
      throw new Error('DayTitleNode expects to be child of CollapsibleContainerNode');
    }
    const paragraph = $createParagraphNode();
    containerNode.insertAfter(paragraph, restoreSelection);
    return paragraph;
  }

  isEmpty(): boolean {
    return false;
  }

  remove(): void {
    // Prevent deletion
  }
}

export function $createDayTitleNode(): DayTitleNode {
  return new DayTitleNode();
}

export function $isDayTitleNode(node: LexicalNode | null | undefined): node is DayTitleNode {
  return node instanceof DayTitleNode;
}
